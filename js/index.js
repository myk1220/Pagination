window.onload = function () {

    //定义插件
    let pagination={
        //插件初始化函数
        init(elem,param){
            let el = document.querySelector(elem);   //获取插件渲染节点
            let oFragmeng = document.createDocumentFragment();  //定义文档流
            if(param.totalPage>0){
                //创建首页及尾页节点，添加首页节点进文档流
                let homePage = document.createElement('div')
                let lastPage = document.createElement('div')
                let prePage = document.createElement('div')
                let nextPage = document.createElement('div')

                homePage.innerHTML = "首页";
                lastPage.innerHTML = "尾页";
                prePage.innerHTML = "上一页";
                nextPage.innerHTML = "下一页";

                homePage.className = 'homePage';
                lastPage.className = 'lastPage';
                prePage.className = 'prePage';
                nextPage.className = 'nextPage';

                oFragmeng.appendChild(homePage);
                oFragmeng.appendChild(prePage);
                //根据总页数循环添加页数节点进文档流
                for(let i=1; i<param.totalPage+1 ;i++){
                    let aNode = document.createElement('a');
                    aNode.innerHTML = i ;
                    aNode.className = i.toString()+'Page';
                    oFragmeng.appendChild(aNode)
                }
                //添加尾页节点进文档流
                oFragmeng.appendChild(nextPage);
                oFragmeng.appendChild(lastPage);
                //将文档流添加至渲染节点
                el.appendChild(oFragmeng);
                //根据当前页参数添加选中样式
                if(param.currentPage>0){
                    //根据当前页数设置上一页首页及下一页尾页可否点击
                    if(param.currentPage>0&&param.currentPage<=param.totalPage){
                        if(param.currentPage==1){
                            document.getElementsByClassName('prePage')[0].style.visibility='hidden';
                            document.getElementsByClassName('homePage')[0].style.visibility='hidden';
                        }else if(param.currentPage==param.totalPage){
                            document.getElementsByClassName('nextPage')[0].style.visibility='hidden';
                            document.getElementsByClassName('lastPage')[0].style.visibility='hidden';
                        }
                        let cPage =param.currentPage.toString()+'Page';
                        document.getElementsByClassName(cPage)[0].classList.add("active");
                    }else{
                        alert('当前页数不符合要求')
                    }
                }else{
                    alert('当前页初始化错误')
                }
            }else{
                alert("总页数不得小于1")
            }

            // 添加时间委托获取点击页数
            el.addEventListener('click',(event)=>{
                let e = event || window.event;
                let target = e.target || e.srcElement;
                let activeNodeNumber =parseInt(getActive(target).innerHTML) 
                if(target.nodeName =='A'){
                    param.callback(parseInt(target.innerHTML));
                    removeClass(target);
                    document.getElementsByClassName(target.innerHTML+'Page')[0].classList.add("active")
                    activeNodeNumber = parseInt(target.innerHTML);
                }else{
                    let info = target.innerHTML ;
                    switch(info){
                        case '首页':
                            param.callback(1);
                            removeClass(target);
                            document.getElementsByClassName('1Page')[0].classList.add("active");
                            activeNodeNumber = 1;
                            break;
                        case '上一页':
                            let lastpage = activeNodeNumber-1;
                            if(lastpage>0&&lastpage<=param.totalPage-1){
                                removeClass(target);
                                document.getElementsByClassName((lastpage).toString()+'Page')[0].classList.add("active");
                                param.callback(lastpage);
                                activeNodeNumber=lastpage
                            }
                            break;
                        case '尾页':
                            param.callback(param.totalPage);
                            removeClass(target);
                            document.getElementsByClassName(param.totalPage.toString()+'Page')[0].classList.add("active");
                            activeNodeNumber = param.totalPage;
                            break;
                        case '下一页':
                            let nextpage = activeNodeNumber+1;
                            if(nextpage>0&&nextpage<=param.totalPage){
                                removeClass(target);
                                document.getElementsByClassName((nextpage).toString()+'Page')[0].classList.add("active");
                                param.callback(nextpage);
                                activeNodeNumber=nextpage;
                            }
                            break;
                    }
                }

                //最后判断是否为首页及尾页进行调整首页尾页上一页下一页按钮的可点击属性
                switch (activeNodeNumber){
                    case 1:
                        document.getElementsByClassName('prePage')[0].style.visibility='hidden';
                        document.getElementsByClassName('homePage')[0].style.visibility='hidden';
                        document.getElementsByClassName('nextPage')[0].style.visibility='visible';
                        document.getElementsByClassName('lastPage')[0].style.visibility='visible';
                        break;
                    case param.totalPage:
                        document.getElementsByClassName('nextPage')[0].style.visibility='hidden';
                        document.getElementsByClassName('lastPage')[0].style.visibility='hidden';
                        document.getElementsByClassName('prePage')[0].style.visibility='visible';
                        document.getElementsByClassName('homePage')[0].style.visibility='visible';
                        break;
                    default:
                        document.getElementsByClassName('prePage')[0].style.visibility='visible';
                        document.getElementsByClassName('homePage')[0].style.visibility='visible';
                        document.getElementsByClassName('nextPage')[0].style.visibility='visible';
                        document.getElementsByClassName('lastPage')[0].style.visibility='visible';
                }

            },true)

            //封装删除兄弟类名函数
            function removeClass(node){
                let broNode = node.parentNode.children;
                for(let i=0;i<broNode.length;i++){
                    let reg = /active/g ;
                    if(broNode[i].className.match(reg)){
                        broNode[i].classList.remove('active');
                    };
                }
            }

            //封装获取当前active节点函数
            function getActive(node){
                let broNode = node.parentNode.children;
                for(let i=0;i<broNode.length;i++){
                    let reg = /active/g ;
                    if(broNode[i].className.match(reg)){
                        return broNode[i]
                    }
                }
            }

        },
    };

    pagination.init("#pagination", {
        totalPage: 10,
        currentPage: 5,
        callback: function(page) {
            console.log(page)
        }
        })
}