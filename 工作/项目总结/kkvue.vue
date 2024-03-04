<template>
  <li
      class="item"
      :class="currentItem === scene ? 'is-hover' : null"
      @mouseenter="onMouseEnterItem(scene)"
      @mouseleave="onMouseEnterItem(null)">
      <div class="eqf-card-image">
          <div v-if="designCreation" class="cover over-cover" :style="backgroundCoverStyle"></div>
          <a @click="viewScene(scene)">
              <img :class="{ 'h2-cover': designCreation }" :src="sceneCover" />
          </a>
          <div v-if="scene.staffName" class="scene-staff-name">
              {{ getStaffName() }}
          </div>
          <div
              v-if="scene.viewStatusName && !isShowReviewStatus"
              class="scene-status"
              :class="['scene-status-' + scene.status]">
              {{ scene.viewStatusName }}
          </div>
          <!-- 审核状态 -->
          <div v-if="isShowReviewStatus" class="review-status" :class="auditStatusStyle[showStatus]">
              <span>{{ showStatus | getAuditStatusName }}</span>
          </div>
      </div>
      <div class="eqf-card-info space">
          <!-- 审批状态 -->
          <div v-if="isShowApprovalStatus" class="approval-status">
              <span :class="APPROVAL_STATUS_MESSAGE[scene.approveStatus].class">
                  {{ APPROVAL_STATUS_MESSAGE[scene.approveStatus].msg }}
              </span>
          </div>
          <div class="card-title ellipsis" :class="{ 'approval-style': isShowApprovalStatus }">
              <span v-if="activityName && scene.viewStatus === 2" class="activity-status-wrap">
                  <em :class="activityIcon" style="margin-bottom: 2px"></em>{{ activityName }} </span
              >{{ getSceneTitle }}
          </div>
          <div v-if="scene.type != 'design'" class="card-price">
              <div class="operate-wrap" @click="showDataAnalyse(4)">
                  <span>{{ getNumberCount(scene.pv) }}</span>
                  {{ $t('scene.pv') }}
              </div>
              <div class="operate-wrap" @click="showDataAnalyse(4)">
                  <span>{{ getNumberCount(scene.uv) }}</span>
                  {{ $t('scene.uv') }}
              </div>
              <div class="operate-wrap" @click="showDataAnalyse(FORM_DATA_SUMMARIZE)">
                  <span>{{ getNumberCount(scene.fpv) }}</span> {{ $t('scene.forms') }}
              </div>
          </div>
          <div v-if="scene.type == 'design'" class="card-price">
              <div class="operate-wrap">
                  {{ getDesignType(scene.bizType) }} {{ scene.ext.height }} * {{ scene.ext.width }}
                  {{ scene.ext.unit }}
              </div>
          </div>
      </div>
      <div v-if="scene.status === 6" class="qrcode-wrap">
          <span class="eqf-QRcode" @mouseenter="show = true"></span>
          <div v-show="show === true" class="qrcode-content" @mouseleave="show = false">
              <div class="zoomIn-change">
                  <qr-code :url="url" :size="size" />
              </div>
          </div>
      </div>
      <div class="scene-mask-wrap">
          <div class="scene-mask" @mouseleave="closeOperation">
              <span class="operate-bar-menu" @mouseenter="showOperation">...</span>
              <operate-menu
                  v-if="showOperate && operates.length > 0"
                  class="scene-operate"
                  :operates="operates"
                  :data="this.scene"
                  :menu-operating.sync="menuOperating"
                  @clicked="itemClick"
                  @moveTo="moveTo($event)"
                  @mouseenter="showOperation"
                  @mouseleave="closeOperation"
                  v-on="$listeners" />
              <a v-if="previewAuth" v-t="'common.preview'" class="details-btn" @click.self="viewScene"></a>
          </div>
          <div v-if="scene.fromPage === 'own'" class="scene-oprate">
              <div
                  v-if="editAuth"
                  class="operate-wrap"
                  :class="{
                      stopped: !scene.forceEditEnable && (scene.status === 4 || scene.status === 5)
                  }"
                  @click="goToEditor">
                  <span class="icon eqf-pen-l"></span>
                  <span v-t="'common.edit'"></span>
              </div>
              <div
                  v-if="scene.type != 'hd' && scene.type != 'design' && dataAuth"
                  class="operate-wrap"
                  @click="showDataAnalyse(1)">
                  <span class="icon eqf-data-f"></span>
                  <span v-t="'common.data'"></span>
              </div>
              <div v-if="scene.type == 'hd' && manageAuth" class="operate-wrap" @click="showDataAnalyse(4)">
                  <span class="icon eqf-setting-l"></span>
                  <span v-t="'common.activityManagement'"></span>
              </div>
              <div v-if="scene.type != 'design' && shareAuth" class="operate-wrap" @click="viewScene">
                  <span class="icon eqf-external-link"></span>
                  <span v-t="'common.share'"></span>
              </div>
              <div v-if="scene.type == 'design'" class="operate-wrap" @click="download">
                  <span class="icon eqf-download"></span>
                  <span v-t="'common.download'"></span>
              </div>
          </div>
          <div v-if="scene.fromPage === 'staff'" class="scene-oprate">
              <div class="operate-wrap" @click="showDataAnalyse(1)">
                  <span class="icon eqf-data-f"></span>
                  <span v-t="'common.data'"></span>
              </div>
              <div
                  class="operate-wrap"
                  :class="{ stopped: scene.status === 2 || scene.applyTemplate === 1 }"
                  @click="copyToTemplate">
                  <span class="icon eqf-layout-l"></span>
                  <span v-t="'template.beTemplate'"></span>
              </div>
              <div class="operate-wrap" :class="{ stopped: scene.status === 2 }" @click="stopViewScene">
                  <span class="icon eqf-slash-l"></span>
                  <span v-t="'common.disabled'"></span>
              </div>
          </div>
      </div>
  </li>
</template>
<script>
import { host } from 'env'
import qrCode from '@/components/common/QrCode.vue'
import dtype from '@/assets/js/dtype.js'
import OperateMenu from '@/components/common/OperateMenu'
import { applyToTemplate, copyScene, deleteScene, moveSceneTag, publishScene, stopViewScene } from '@/api/sceneApi'
import Util from '@/utils/util'
import { useMenuOperation } from '@/components/common/scene/useMenuOperation'
import { removeHtmlTags } from '@/utils/tool'
import { SCENE_STATUS } from '@/const/scene'
import {
  CREATION_STATUS_DISABLE,
  REVIEW_STATUS,
  APPROVAL_STATUS,
  APPROVAL_STATUS_MESSAGE,
  ZHULI_WORK,
  STATUS_UNPUBLISHED,
  STATUS_FINISHED
} from '@/const/template-const'
import { mapGetters } from 'vuex'
import editLock from '@eqxiu/ecmp-edit-lock'
import { getApproveFlag, publishFlow } from '@/api/todoTask'
import OpenApproval from '@/components/dialogs/approvalOn/openDialog'
import i18n from '@/plugins/i18n'
const FORM_DATA_SUMMARIZE = 2 // 表单数据
const FORM_DATA_SUMMARIZE_HD = 7 // 互动表单汇总

export default {
  components: {
      qrCode,
      OperateMenu
  },
  filters: {
      getAuditStatusName(val) {
          const auditStatusMap = {
              [REVIEW_STATUS.UNDER_PROGRESS]: i18n.t('scene.underReview'),
              [REVIEW_STATUS.SUCCEEDED]: i18n.t('scene.reviewPass'),
              [REVIEW_STATUS.REJECTED]: i18n.t('scene.reviewReject')
          }
          return auditStatusMap[val] || ''
      }
  },
  props: {
      category: { // 类目
          type: Array,
          default: null
      },
      moveToCats: {// 分组
          type: Array,
          default: null
      },
      scene: { // 作品详情信息
          type: Object,
          default: null
      },
      type: { // 类型
          type: String,
          default: 'own'
      },
      approveIsOpen: {  // 企业是否开启了审批
          type: Boolean,
          default: false
      }
  },
  data() {
      return {
          show: false, // 是否显示二维码
          viewStatus: 0,// 审核状态
          sceneStatus: '',// 作品状态
          showOperate: false, // 是否显示操作菜单
          size: { width: '180', height: '180' },// 二维码大小
          url: 
              Util.previewUrl(this.scene.type, this.scene.code) +(this.scene.viewStatus === SCENE_STATUS.PUBLISHED ? '.html' : '?tag=snapshot'),
          operates: [],// 操作菜单
          activityName: null,// 活动名称
          activityIcon: null,// 活动图标
          categories: [],// 类目
          FORM_DATA_SUMMARIZE,// 表单数据
          FORM_DATA_SUMMARIZE_HD,// 互动表单汇总
          auditStatusStyle: {// 审核状态样式
              [REVIEW_STATUS.UNDER_PROGRESS]: 'under-progress',
              [REVIEW_STATUS.SUCCEEDED]: 'success',
              [REVIEW_STATUS.REJECTED]: 'reject'
          },
          APPROVAL_STATUS_MESSAGE,// 审批字段映射
          approveSuggest: ''// 审批建议
      }
  },
  computed: {
      ...mapGetters('corp', ['isTopDomain']),
      getSceneTitle() { // 获取作品标题
          return removeHtmlTags(this.scene.title)
      },
      isShowReviewStatus() {      // 是否显示审核状态
          if (this.scene.status === CREATION_STATUS_DISABLE) return
          const reviewStatusList = [REVIEW_STATUS.REJECTED, REVIEW_STATUS.UNDER_PROGRESS, REVIEW_STATUS.SUCCEEDED]
          return reviewStatusList.includes(this.showStatus)
      },
      isShowApprovalStatus() {      // 是否显示审批状态
          const approvalStatusList = [
              APPROVAL_STATUS.REJECTED,
              APPROVAL_STATUS.UNDER_PROGRESS,
              APPROVAL_STATUS.SUCCEEDED
          ]
          return approvalStatusList.includes(this.scene.approveStatus)
      },
      ...mapGetters([
          'previewAuth', // 预览权限
          'shareAuth',// 分享权限
          'editAuth',// 编辑权限
          'dataAuth',// 数据权限
          'manageAuth',// 管理权限
          'staffCopyAuth',// 复制权限
          'staffDeleteAuth',// 删除权限
          'staffMoveToAuth'// 移动权限
      ]),
      showStatus() {      // 是否有第三方域名
          if (this.isTopDomain && (this.scene?.labelDetail ?? '').includes('诱导关注公众号')) {
              return 1
          }
          return this.scene.auditStatus
      },
      designCreation() { // 海报作品
          return this.scene.type === 'design'
      },
      sceneCover() { // 作品封面
          const _t = this.scene.cover && this.scene.cover.includes('?') ? '&' : '?'
          const imgParam = `${_t}imageMogr2/thumbnail/263x263`
          if (!this.scene.cover) {
              // 默认封面
              return `${host.file}common/${this.scene.type}.png${imgParam}`
          }
          if (this.scene.cover.indexOf('http') > -1) {
              return this.scene.cover + imgParam
          }
          return host.file + this.scene.cover + imgParam
      },
      backgroundCoverStyle() { // 背景封面
          return {
              backgroundImage: `url(${this.sceneCover})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: '50% center',
              backgroundSize: '140%',
              filter: 'blur(32px)'
          }
      }
  },
  created() {
      // 按员工功能权限动态增加菜单: 复制/删除/移动至
      this.handleOperatesByAuth()
      const categories = []
      if (this.category) {
          // 把label转成id
          for (const ca of this.category) {
              const categoriesSub = []
              if (ca.children) {
                  for (const cac of ca.children) {
                      categoriesSub.push({
                          id: cac.value,
                          name: cac.label
                      })
                  }
              }
              categories.push({
                  id: ca.value,
                  name: ca.label,
                  children: categoriesSub
              })
          }
          this.categories = categories
      }
      const moveTo = []
      if (this.moveToCats) {
          // 把label转成id
          for (const ca of this.moveToCats) {
              const moveToSub = []
              if (ca.children) {
                  for (const cac of ca.children) {
                      let label = cac.label
                      if (cac.value === -1) {
                          label = this.$t('common.default')
                      }
                      moveToSub.push({
                          id: cac.value,
                          name: label
                      })
                  }
              }
              let label = ca.label
              if (ca.value === -1) {
                  label = this.$t('common.default')
              }
              moveTo.push({
                  id: ca.value,
                  name: label,
                  children: moveToSub
              })
          }
      }

      if (this.scene.startTime && this.scene.endTime) {
          const now = new Date().getTime()
          const start = new Date(this.scene.startTime).getTime()
          const end = new Date(this.scene.endTime).getTime()
          if (end < now) {
              this.activityName = this.$t('common.over')
              this.activityIcon = 'dot-status-gray'
          } else if (start <= now && now <= end) {
              this.activityName = this.$t('common.inProgress')
              this.activityIcon = 'dot-status-green'
          } else {
              this.activityName = this.$t('common.notStart')
              this.activityIcon = 'dot-status-gray'
          }
      }
  },
  methods: {
      getDesignType(type) {// 获取海报类型
          return dtype[type]
      },
      getNumberCount(value) {// 格式化数字
          return Util.formatNumNoFix(value)
      },
      stopViewScene() {// 停用作品
          if (this.scene.status === 3) {
              return false
          }
          this.$confirm(this.$t('scene.disabledConfirm'), {
              type: 'warning'
          })
              .then(() => {
                  stopViewScene({ sceneId: this.scene.id }).then(res => {
                      if (res && res.code == 200) {
                          this.$emit('refresh', true)
                          this.$message({ message: this.$t('operate.operationSuc'), type: 'success' })
                      }
                  })
              })
              .catch(() => {})
      },
      handleShowDataAnalysisInPreview() {// 在预览弹窗上跳转基础数据页面
          if (!this.scene.publishTime && this.scene.status == 1) return
          // dataAnalyse
          const dataAnalyseClassify = 4
          this.showDataAnalyse(dataAnalyseClassify)
      },
      openSceneView() { // 打开作品预览
          this.scene.fromPage = this.type
          // 海报也显示分享弹窗
          let prom = null
          if (this.scene.type === 'design') {
              this.scene.secretId = this.$store.getters.secretId
              prom = this.dialog.openDesignView(this.scene)
              return
          } else {
              this.scene.handleShowDataAnalysisInPreview = this.handleShowDataAnalysisInPreview.bind(this)
              this.scene.sceneClassify = 'person'
              prom = this.dialog.openView(this.scene)
          }
          prom.then(res => {
              if (res && res.code === 'form') {
                  this.$emit('showDataAnalyse', res.scene)
              }
              this.$emit('refresh', true)
          }).catch(res => {
              this.$emit('refresh', true)
          })
      },
      getFullEditorUrl(url) {// 为链接携带frame已有的参数
          const u = new URL(url)
          const l = new URL(location.href)
          u.protocol = l.protocol
          ;[...l.searchParams.entries()].forEach(([k, v]) => {
              u.searchParams.set(k, v)
          })
          return u.toString()
      },
      async goToEditor() {
          if ((this.scene.status !== 4 && this.scene.status !== 5) || this.scene.forceEditEnable) {
              // // 判断当前是否有用户在编辑,有则不能编辑
              const res = await editLock.emit(
                  'inquireLock',
                  {
                      HOST: host.globalHOST,
                      scene: {
                          meta: {
                              id: this.scene.id
                          }
                      }
                  },
                  true
              )
              if (res && res.obj && !res.obj.canEdit) {
                  return this.$message({
                      message: `${this.$t('scene.creationInEditTip')}${this.$t('scene.currentEditUser')}${
                          res?.obj?.editingUser?.name
                      }`,
                      type: 'error'
                  })
              }

              let editorUrl = this.scene.editUrl
              const urlParam = window.localStorage.getItem('_auth_token')
              if (!urlParam) {
                  window.location.replace(this.getFullEditorUrl(editorUrl))
                  return
              }
              const resultUrl = new URL(editorUrl)

              if (urlParam) {
                  if (this.scene.type != 'design') {
                      resultUrl.searchParams.set('Authorization', urlParam)
                  }
              }
              const secretId = Util.getUrlParam('secretId')

              if (secretId) {
                  resultUrl.searchParams.set('secretId', secretId)
              }

              let redirectUrl = window.location.href

              if (redirectUrl.indexOf('type=') < 0) {
                  if (redirectUrl.indexOf('?') > 0) {
                      redirectUrl = redirectUrl + '&type=' + this.scene.type + '&id=' + this.scene.id
                  } else {
                      redirectUrl = redirectUrl + '?type=' + this.scene.type + '&id=' + this.scene.id
                  }
              }

              resultUrl.searchParams.set('referrer', encodeURIComponent(redirectUrl))

              editorUrl = resultUrl.toString()

              window.location.replace(this.getFullEditorUrl(editorUrl))
              // window.open(host.globalHOST + 'gc/' + this.scene.id, '_parent')
          }
      },
      moveTo(res) {
          if (res && res.id) {
              const params = {
                  tagIds: res.id,
                  ids: this.scene.id
              }
              moveSceneTag(params).then(res => {
                  this.$message({ message: this.$t('category.moveSuc'), type: 'success' })
                  this.$emit('refresh', true)
              })
          }
      },
      async itemClick(res) {
          if (res.operate.id === 1) {
              // 复制
              this.$msgbox({
                  title: this.$t('scene.copyConfirm'),
                  showCancelButton: true
              })
                  .then(() => {
                      copyScene({ id: res.data.id })
                          .then(rest => {
                              if (rest && rest.code == 200) {
                                  this.$message({ message: this.$t('scene.copySuc'), type: 'success' })
                                  // window.location.href = host.globalHOST + 'gc/' + rest.obj
                                  const editorUrl = Util.getCreationEditorUrl(res.data.type, rest.obj)
                                  if (!this.$store.getters.embed) {
                                      window.location.replace(editorUrl)
                                      return
                                  }
                                  const resultUrl = new URL(editorUrl)

                                  const referrer =
                                      host.globalHOST + 'embed/creation?type=' + res.data.type + '&id=' + rest.obj

                                  resultUrl.searchParams.set('referrer', referrer)

                                  const token = window.localStorage.getItem('_auth_token')

                                  token && resultUrl.searchParams.set('Authorization', token)

                                  const secretId = this.$store.getters.secretId
                                  secretId && resultUrl.searchParams.set('secretId', secretId)

                                  window.location.href = resultUrl.toString()
                              }
                          })
                          .catch(res => {
                              this.$message.error(res.msg)
                          })
                  })
                  .catch(() => {
                      console.log('cancle copy creation')
                  })
          } else if (res.operate.id === 2) {
              // 互动作品活动状态为进行中和暂停中，则不可删除
              if (
                  res.data.type === 'hd' &&
                  [ZHULI_WORK.STATUS_PUBLISHED, ZHULI_WORK.STATUS_PAUSED].includes(+res.data.activityStatus) &&
                  ![STATUS_UNPUBLISHED, STATUS_FINISHED].includes(+res.data.status)
              ) {
                  this.$confirm(this.$t('scene.deleteTip'), {
                      type: 'warning'
                  })
                  return
              }
              this.$confirm(this.$t('scene.deleteConfirm'), {
                  type: 'warning'
              })
                  .then(() => {
                      // 删除
                      deleteScene({ id: res.data.id })
                          .then(rest => {
                              if (rest && rest.code == 200) {
                                  this.$message({ message: this.$t('scene.deleteSuc'), type: 'success' })
                                  this.$emit('refresh', true)
                              }
                          })
                          .catch(res => {
                              // 该作品被其他作品关联，必须删除父作品才能删除子作品
                              const productBeAssociatedSign = 12504
                              if (res.code === 'B000001' && res.obj === productBeAssociatedSign) {
                                  return this.$confirm(this.$t('scene.deleteDisabled'), {
                                      type: 'warning'
                                  })
                              }
                              this.$message.error(res.msg)
                          })
                  })
                  .catch(() => {})
          } else if (res.operate.id === 4) {
              this.stopViewScene()
          }
      },
      copyToTemplate() {
          if (this.scene.status === 2 || this.scene.applyTemplate === 1) {
              return false
          }

          this.dialog.openBeToTemplateDialog({ categories: this.categories }).then(res => {
              if (res.code === 'template') {
                  let tagId = null
                  if (res.item.type === 1 && res.item.id === -1) {
                      tagId = -1
                  } else if (res.item.child && res.item.child.id !== -1) {
                      tagId = res.item.child.id
                  } else if (res.item.id) {
                      tagId = res.item.id
                  }
                  applyToTemplate({ id: this.scene.id, tagId: tagId }).then(act => {
                      this.$message({ message: this.$t('operate.operationSuc'), type: 'success' })
                      this.$emit('refresh', true)
                  })
              }
          })
      },
      showDataAnalyse(tag) {
          if (!this.scene.publishTime && this.scene.status == 1) {
              this.$msgbox({
                  title: this.$t('scene.publishTip'),
                  type: 'warning',
                  showCancelButton: true,
                  confirmButtonText: this.$t('common.publish')
              })
                  .then(() => {
                      this.publishScene()
                  })
                  .catch(() => {
                      console.log('cancle publish creation')
                  })
              return false
          }
          const item = this.scene
          item.tag = tag
          if (tag == 4) {
              item.tag = this.scene.type === 'hd' ? 4 : 1
          }
          item.tag === FORM_DATA_SUMMARIZE && this.scene.type === 'hd' && (item.tag = FORM_DATA_SUMMARIZE_HD)
          this.$emit('showDataAnalyse', item)
      },
      getImage(img) {
          return host.file + img
      },
      getStaffName() {
          if (this.scene.staffName && this.scene.staffName.length > 4) {
              return this.scene.staffName.substring(0, 4) + '...'
          }
          return this.scene.staffName
      },
      getStatus() {
          this.scene.viewStatus = Util.getSceneStatus(this.scene)
          this.scene.viewStatusName = Util.getSceneStatusName(this.scene)
      },
      canOperate() {
          if (this.scene.status && this.scene.status === 3) {
              this.$message({ message: this.$t('scene.sceneDisabled'), type: 'warning' })
              return false
          }
          return true
      },
      async publishScene() {
          const ca = this.canOperate()
          if (!ca) {
              return false
          }
          const that = this
          try {
              const res = await getApproveFlag()
              if (res.code == 200) {
                  const { approveFlag } = JSON.parse(res?.list?.[0]?.value ?? '{}')
                  // 此处和弹框都请求了以下接口，请看到之人不要惊吓；由于是开发完后续加的判断，弹框里的代码不易改变
                  const {
                      data: { code, obj = {} }
                  } = await publishFlow(that.scene.id)
                  const showStartFlowView = code == 200 ? obj.showStartFlowView : false
                  if (approveFlag == 11 && showStartFlowView) {
                      OpenApproval.open({
                          fn: suggest => {
                              that.approveSuggest = suggest
                              that.publishOver()
                          },
                          scene: that.scene,
                          type: 'publish'
                      })
                  } else {
                      that.publishOver()
                  }
              }
          } catch (err) {
              console.error(err, 'Approval is error')
          }
      },
      viewScene() {
          console.log(111)
          // 企业开启了审批状态时 且 审批未发布，走审批发布流程
          if (this.approveIsOpen && !this.scene.publishTime && this.scene.status == 1) {
              return this.$msgbox({
                  title: this.$t('scene.approveTip'),
                  type: 'warning',
                  showCancelButton: true,
                  confirmButtonText: this.$t('common.publish')
              })
                  .then(() => {
                      this.publishScene()
                  })
                  .catch(() => {
                      console.log('cancle review')
                  })
          }
          // 未发布
          if (!this.scene.publishTime && this.scene.status == 1) {
              this.$msgbox({
                  title: this.$t('scene.publishTip'),
                  type: 'warning',
                  showCancelButton: true,
                  confirmButtonText: this.$t('common.publish')
              })
                  .then(() => {
                      this.publishScene()
                  })
                  .catch(() => {
                      console.log('cancle publish')
                  })
              return false
          }

          // 有更新
          // if (this.scene.viewStatus === -2) {
          //     this.$msgbox({
          //         title: '该作品有修改，重新提交审批？',
          //         type: 'warning',
          //         showCancelButton: true,
          //         cancelButtonText: '否',
          //         confirmButtonText: '是',
          //     }).then(() => {
          //         this.publishScene()
          //     }).catch(() => {
          //         this.openSceneView()
          //     })
          //     return false
          // }
          // 其他
          this.openSceneView()
      },
      // 下载
      download() {
          this.openSceneView()
      },
      // 按员工功能权限动态增加菜单: 复制/删除/移动至
      handleOperatesByAuth() {
          if (this.staffCopyAuth) {
              // 添加'复制'菜单
              this.operates.push({
                  id: 1,
                  name: this.$t('common.copy'),
                  icon: 'eqf-copy-l',
                  isShow: true,
                  liStyle: 'text-align:left;padding-left:12px;'
              })
          }
          if (this.staffDeleteAuth) {
              // 添加'删除'菜单
              this.operates.push({
                  id: 2,
                  name: this.$t('common.delete'),
                  icon: 'eqf-delete-l',
                  isShow: true,
                  liStyle: 'text-align:left;padding-left:12px;'
              })
          }
          if (this.staffMoveToAuth) {
              // 添加'移动至'菜单
              this.operates.push({
                  id: 'move-group',
                  name: this.$t('category.moveTo'),
                  icon: 'eqf-move-l',
                  isShow: true,
                  liStyle: 'text-align:left;padding-left:12px;'
              })
          }
      },
      publishOver() {
          publishScene({ id: this.scene.id, suggest: this.approveSuggest })
              .then(res => {
                  if (res && res.code == 200) {
                      this.$message({ message: this.$t('scene.publishSuc'), type: 'success' })
                      this.openSceneView()
                      this.$emit('refresh', true)
                  }
              })
              .catch(res => {
                  // this.$message.error(res.msg);
              })
      }
  },
  setup() { // 作品操作
      const { currentItem, menuOperating, onMouseEnterItem, showOperation, closeOperation } = useMenuOperation({
          opKey: 'showOperate'
      })
      return {
          currentItem,
          menuOperating,
          onMouseEnterItem,
          showOperation,
          closeOperation
      }
  }
}
</script>
<style lang="scss" scoped>
.eqf-card-info {
  .card-price {
      .operate-wrap {
          height: 18px;
          cursor: pointer;
          display: inline-block;
          padding-right: 12px;
          position: relative;
          color: #666;

          span {
              font-size: 12px;
              font-weight: 400;
              color: $brand-primary;
              height: 18px;
          }

          &:hover {
              color: $brand-primary;
              cursor: pointer;
          }
      }
  }
  .approval-status {
      margin-top: 8px;
      font-size: 12px;
      span {
          display: inline-block;
          height: 20px;
          line-height: 20px;
          padding: 0 6px;
          border-radius: 4px;
          &.under-approval {
              color: #ec8e00;
              background: #fef6eb;
          }
          &.approval-pass {
              color: #3ca06c;
              background: #ecf5f0;
          }
          &.approval-fail {
              color: $brand-danger;
              background: #ffedec;
          }
      }
  }
  .card-title__approval {
      height: 38px;
      font-size: 14px;
      line-height: 38px;
  }
  .approval-style {
      height: 32px;
      line-height: 32px;
  }
}

.scene-operate {
  width: 140px;
  position: absolute;
  right: 8px;
  top: 30px;
  float: right;

  li {
      height: 80px;
      text-align: left !important;
  }
}
</style>
