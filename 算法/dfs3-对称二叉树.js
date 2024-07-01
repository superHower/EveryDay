/*
101. 对称二叉树
给你一个二叉树的根节点 root ， 检查它是否轴对称。
*/

function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}
var isSymmetric = function(root) {
  
  function isMirror(p, q) {// 辅助函数，用于比较两个子树是否镜像对称
    if (!p && !q) return true;
    if (!p || !q || p.val !== q.val) return false;

    // 递归地检查左子树与右子树是否镜像对称
    return isMirror(p.left, q.right) && isMirror(p.right, q.left);
  }
  if (root === null) return true;
  
  return isMirror(root.left, root.right);// 使用辅助函数检查是否对称
};

const root = new TreeNode(1, new TreeNode(2, new TreeNode(3), new TreeNode(4)), new TreeNode(2, new TreeNode(4), new TreeNode(3)))
console.log(isSymmetric(root))

/**
输入：root = [1,2,2,3,4,4,3]
输出：true

输入：root = [1,2,2,null,3,null,3]
输出：false


 */