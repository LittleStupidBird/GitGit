
define(function () {
    return {
        changeTopBtn:function(btn){
            var btns = document.getElementById(btn);
            btns = btns.children;

            for(var i=0;i<btns.length;i++){
                btns[i].style.background = '#fff';
                btns[i].onclick = function(){
                    for(var j=0;j<btns.length;j++){
                        btns[j].style.background = '#fff';
                        this.style.background = '#eee';
                    }
                }
            }
            btns[0].style.background = '#eee';
        }
    }
});