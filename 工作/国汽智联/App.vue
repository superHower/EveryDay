<template>
  <div class="layout-box">
    <div id="container" ref="containerRef"></div>
    <div class="node-group">
      <DragNode title="摄像头" @getNode="handleDragNode" />
      <DragNode title="陀螺仪" @getNode="handleDragNode"/>
    </div>    
  </div>

</template>


<script setup lang="ts">
import DragNode from './components/DragNode.vue'
import { ref, onMounted, watch } from 'vue';
import G6 from '@antv/g6';

const containerRef = ref(null);
let panelWidth = 0
let graph = ref(null);

const data = ref({
  nodes: [
    { id: 'node1', label: 'node1', x: 350, y: 230 },
    { id: 'node2', label: 'node2', x: 350, y: 360 },
    { id: 'node3', label: 'node3', x: 100, y: 200 },
  ],
  edges: [
    { id: 'e1', label: 'e1', source: 'node1', target: 'node2' },
    { id: 'e2', label: 'e2', source: 'node1', target: 'node3' },
  ],
  combos: [
    { id: 'combo', label: 'Combo', x: 300, y: 300 },
  ],
});
function renderGraph(data) {
  graph.value.data(data);
  graph.value.render();
  console.log('更新graph', graph.value)
}

function initGraph() { 
  const container = containerRef.value;
  if (!container) return;

  panelWidth = container.scrollWidth;
  const width = container.scrollWidth;
  const height = container.scrollHeight;

  graph.value = new G6.Graph({
    container: container,
    width,
    height,
    linkCenter: false,
    modes: {
      default: ['create-edge','click-select', 'drag-node','drag-combo', 'collapse-expand-combo'],
      altSelect: [
      {
        type: 'click-select',
        trigger: 'alt',
      },
      'drag-node',
    ],
    },
    defaultNode: {
      type: 'rect',
      size: [100, 100],
      labelCfg: {
        position: 'center',
        offset: 12,
        style: {
          fontSize: 20,
          fill: '#ccccc',
          fontWeight: 500
        }
      },
    },
    defaultEdge: {
      type: 'quadratic',
      style: {
        stroke: '#F6BD16',
        lineWidth: 2,
        endArrow: {
          path: G6.Arrow.vee(),
        },
      },
    },
    defaultCombo: {
      type: 'rect',
      size: [200, 200],
      style: {
        fill: 'white',
        fillOpacity: 0,
        stroke: 'red',
        lineWidth: 2,
        lineDash: [4, 4],
        opacity: 1,
      },
      labelCfg: {
        refY: 10,
        position: 'top',
        style: {
          fontSize: 18,
        },
      },
    },
  });

  renderGraph(data.value)

  // 创建node
  graph.value.on('aftercreatenode', (e) => {
    data.value.nodes.push(e.node);
    console.log('创建了新node:', graph.value.cfg.data.nodes)
  });
  // 创建combo
  graph.value.on('aftercreatecombo', (e) => {
    data.value.combos.push(e.combo);
    console.log('创建了新combo:', graph.value.cfg.data.combos)
  });
  // 创建边
  graph.value.on('aftercreateedge', (e) => {
    const edges = graph.value.save().edges;
    G6.Util.processParallelEdges(edges);
    graph.value.getEdges().forEach((edge, i) => {
      graph.value.updateItem(edge, {
        curveOffset: edges[i].curveOffset,// 曲线偏移量
        curvePosition: edges[i].curvePosition,// 曲线位置
      });
    });
    data.value.edges.push(e.edge);
    console.log('创建了新edge:', graph.value.cfg.data.edges)
  });
  // 鼠标移入节点
  graph.value.on('node:mouseenter', (e) => {
    graph.value.setItemState(e.item, 'active', true);
  });
  // 鼠标移出节点
  graph.value.on('node:mouseleave', (e) => {
    graph.value.setItemState(e.item, 'active', false);
  });
  // 点击节点
  graph.value.on('node:click', (e) => {
    const clickNodes = graph.value.findAllByState('node', 'click');
    clickNodes.forEach((cn) => {
      graph.value.setItemState(cn, 'click', false);
    });
    const nodeItem = e.item;
    graph.value.setItemState(nodeItem, 'click', true);
  });

  // 点击边
  graph.value.on('edge:click', (e) => {
    const clickEdges = graph.value.findAllByState('edge', 'click');
    clickEdges.forEach((ce) => {
      graph.value.setItemState(ce, 'click', false);
    });
    const edgeItem = e.item;
    graph.value.setItemState(edgeItem, 'click', true);
  });

  window.addEventListener('resize', () => {
    if (!graph.value || graph.value.get('destroyed')) return;
    graph.value.changeSize(container.scrollWidth, container.scrollHeight - 20);
  });
}

onMounted(() => {
  initGraph();
});

function handleDragNode(node) {
  const node_X = node.x + panelWidth
  const node_y = Math.abs(node.y)
  // 使用 graph.value.addItem 创建新节点
  graph.value.addItem('node', {
    id: node.title,
    label: node.title,
    x: node_X,
    y: node_y
  });

  // graph.value.emit('aftercreatenode', { node: graph.value.findById(node.title) });
}
</script>
<style scoped>
.layout-box {
  display: flex;
  #container {
    width: 100%;
    height: 600px;
    background-color: #506480;
  }
  .node-group {
    width: 100px;
    height: 600px;
    border: 1px solid black;
  }
}


</style>
