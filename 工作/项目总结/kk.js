

// 请给我的代码解释好注释
import { host } from '@/config/env' // 引入host
import { mapState } from 'vuex' // 引入vuex
import { creationCreateByTpl } from '@/api/sceneApi' // 引入创建场景接口
import { copyStr, getUrlParamByPrefix } from '@/utils/util' // 引入复制字符串和获取url参数方法

import qrCode from '@/components/common/QrCode.vue' // 引入二维码组件
import TemplateShareView from './TemplateShareView' // 引入模板分享组件
import HoverTip from '../../scene/hd/HoverTip.vue' // 引入hover提示组件

// 引入模板动态数据接口
import { deleteTplDynDataMock, getTplDynDataMock, getTplDynSetting, saveTplDynDataMock } from '@/api/templateApi'

export default {
    name: 'BuildInTplPreview',
    // 引入组件
    components: {
        qrCode,
        TemplateShareView,
        HoverTip
    },
    // 接收父组件的数据，只读
    props: {
        tpl: {
            type: Object,
            default() {
                return {
                    details: {}, // 详情
                    visible: false, // 是否可见
                    showTab: true,// 是否显示tab
                    token: ''// token
                }
            }
        },
        template: {//  定义是否是模板
            type: Boolean,
            default: false
        },
        shareLinkAuth: {// 定义是否是分享链接
            type: Boolean,
            default: true
        },
        nowUseAuth: {// 定义是否使用权限
            type: Boolean,
            default: true
        }
    },
    // 自身组件的数据，可修改
    data() {
        return {
          // 定义当前视图
            currentViewRadio: 'preview',// 当前视图
            isGlobalFrame: false, // 是否是全局框架
            hasCreate: false, // 正在创建模板
            dynMetaDefine: {},// 动态元数据定义
            dynDataList: [],// 动态数据列表
            previewParams: ''// 预览参数
        }
    },
    //  计算属性，修改data的数据
    computed: {
        ...mapState({      //  定义部署配置
            deployConfig: state => { return state.deploy.deployConfig }
        }),
        showDynSettingBox() {//  定义是否显示动态设置框
            return JSON.stringify(this.dynMetaDefine) !== '{}'
        },
        dynTableTh() {//  定义动态表头
            return Object.keys(this.dynMetaDefine).map(k => ({
                value: k,
                label: this.dynMetaDefine[k]
            }))
        },
        dynTableData() {//  定义动态数据
            return this.dynDataList
                .filter(item => !!item.dataValue)
                .map(item => {
                    return { ...JSON.parse(item.dataValue), _dyn_id: item.id }
                })
        },
        staffId() {//  定义是否是员工
            return this.$store.getters.staffId
        },
        coverUrl() {// 封面url
            if (this.tpl.details.productTypeMap) {// 如果模板详情产品类型映射存在
                return `${host.file}/${this.tpl.details.productTypeMap.cover}`  // 返回封面url
            }
            return ''
        },
        size() {// 大小
            return { width: '108', height: '108' }
        },
        details() {// 详情
            return this.tpl.details
        },
        formatedCreatetime() {// 格式化创建时间
            const createTime = new Date(this.details.createTime)// 创建时间
            const year = createTime.getFullYear()
            let month = createTime.getMonth() + 1
            month = month + 1 < 10 ? '0' + month : month
            let day = createTime.getDate()
            day = day < 10 ? '0' + day : day
            let hour = createTime.getHours()
            hour = hour < 10 ? '0' + hour : hour
            let minute = createTime.getMinutes()
            minute = minute < 10 ? '0' + minute : minute
            let second = createTime.getSeconds()
            second = second < 10 ? '0' + second : second
            return year + '-' + month + '-' + day + '   ' + hour + ':' + minute + ':' + second
        },
        previewQRUrl() {// 预览二维码url
          // 返回预览二维码url
            const url = `${host.globalHOST}template/pv/${this.details.id}?cc=${this.details.code}&token=${this.details.token}`
            return url
        },
        previewUrl() {// 预览url
            let url = `${host.globalHOST}template/v/${this.details.id}?cc=${this.details.code}`// 预览url
            const authToken = localStorage.getItem('_auth_token')// 获取本地存储的token
            if (window.top !== window && authToken) {// 如果window.top不等于window并且authToken存在
                url += `&authorization=${authToken}`// url加上授权
            }
            return url
        }
    },
    watch: {
        tpl: {
            handler(val) { // 处理程序
                this.currentViewRadio = val.activeTab || 'preview'// 当前视图
                this.getDynSetting()// 获取动态设置
            },
            deep: true// 深度
        }
    },
    mounted() {
        window.addEventListener('message', this.messageHandler)// 监听message事件
    },
    destroyed() {
        window.removeEventListener('message', this.messageHandler)// 移除message事件
    },
    methods: {
        getDynSetting() {// 获取动态设置
            getTplDynSetting(this.details.id)// 获取模板动态设置
                .then(res => {
                    this.dynMetaDefine = JSON.parse(res?.obj?.dynMetaDefine || '{}')// 动态元数据定义
                })
                .then(() => {
                    return getTplDynDataMock(this.details.id)// 获取模板动态数据
                })
                .then(res => {
                    this.dynDataList = res.obj || []// 动态数据列表
                })
        },
        increaseDynData() {// 增加动态数据
            const newDynData = this.createNewDynData()// 创建新的动态数据
            this.dynDataList.push({// 动态数据列表
                templateId: this.details.id,// 模板id
                dataValue: JSON.stringify(newDynData)// 数据值
            })
        },
        createNewDynData() {// 创建新的动态数据
            const ret = {}
            this.dynTableTh.forEach(th => {// 动态表头
                ret[th.value] = '-'// 返回表头
            })
            return ret
        },
        getDynData() {// 获取动态数据
            getTplDynDataMock(this.details.id).then(res => {// 获取模板动态数据
                this.dynDataList = res.obj || []// 动态数据列表
            })
        },
        saveDynData(item) {// 保存动态数据
            const tmpItem = { ...item }// 临时项目
            delete tmpItem._dyn_id// 删除临时项目
            saveTplDynDataMock({ // 保存模板动态数据
              id: item._dyn_id, 
              templateId: this.details.id, 
              dataValue: JSON.stringify(tmpItem) 
            })
                .then(res => {
                    this.getDynData()
                })
                .catch(err => {
                    this.$message.error(err.msg)
                })
        },
        deleteDynData(id) {// 删除动态数据
            deleteTplDynDataMock(this.details.id, id).then(res => {
                this.getDynData()
            })
        },
        previewDynTpl(id) {// 预览动态模板
            this.previewParams = `&dynId=${id}`
        },
        messageHandler(e) {// 消息处理程序
            const data = e.data || {}// 数据
            if (data.type === 'staff-tree') {// 如果数据类型是员工树
                this.isGlobalFrame = data.visible// 是否是全局框架
            }
        },
        getIframeSrc(config) {// 获取iframe src
            if (!config) {// 如果没有配置
                return
            }
            return `${host.customHost}${config.embedPath}?templateId=${this.details.id}`// 返回iframe src
        },
        close() {// 关闭
            this.tpl.visible = false// 模板可见
        },
        useTemplateNow() {// 立即使用模板
            this.hasCreate = true// 已经创建
            const params = {// 参数
                templateId: this.tpl.details.id,// 模板id
                type: this.tpl.type || this.tpl.details.sceneType,// 类型
                groupId: this.tpl.groupId || ''// 组id
            }

            // 永旺新增url参数前缀
            const prefixArr = getUrlParamByPrefix('cp_')// 获取url参数前缀
            if (prefixArr.length) {// 如果url参数前缀长度
                prefixArr.forEach(ele => {// 遍历url参数前缀
                    const key = ele.split('=')[0]// 键
                    const val = ele.split('=')[1]// 值
                    params[key] = val// 参数
                })
            }

            creationCreateByTpl(params).then(res => {// 创建模板
                if (res && +res.code === 200) {// 如果res和res.code等于200
                    const token = window.localStorage.getItem('_auth_token')// 获取本地存储的token
                    window.location.href = token ? `${res.obj.url}/${token}` : res.obj.url
                }
            })
        },
        copyId() {
            copyStr(this.details.id)// 复制id
        }
    }
}




