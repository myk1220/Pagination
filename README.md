# Pagination
原生js封装  分页器初始化插件  点击 回调函数返回page页码

使用方法：
1、引入index.js及pagination.css
2、在需初始化插件的地方加入<div id='pagination'></div>
3、js中调用
          pagination.init('#pagination', {
              totalPage: 10, //初始化插件总页数
              currentPage: 1, //初始化插件当前页
            callback: function(page) {
               //回调函数返回点击页数page
           }
           })
          
