let RandomUtils = {
    //生成从minNum到maxNum的随机数
    randomNum:function(minNum,maxNum){ 
        switch(arguments.length){ 
            case 1: 
                return parseInt(Math.random()*minNum+1,10); 
            case 2: 
                return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
            default: 
                return 0;
        } 
    } 
};

module.exports = RandomUtils;