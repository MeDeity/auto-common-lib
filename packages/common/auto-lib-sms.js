importClass(android.net.Uri);

let AutoLibSms = {
    
    /**
     * 读取特定手机号码的第一条短信
     * @param {String} phoneNumber 手机号码
     */
    getPhoneNumberSmsFirstInBox:function(phoneNumber){
        let smsInBox = Uri.parse("content://sms/");//收件箱
        let contentResolver = context.getContentResolver();
        var projection = ["_id","address","person","body","date","type"];//短信的一些属性
        var cur = contentResolver.query(smsInBox, projection, "address="+phoneNumber, null, "date desc");//此处报错是因为系统没允许autojs读取短信            
        if (null != cur) {
            let message={};
            if (cur.moveToNext()) {
                message={
                    phoneNumber:cur.getString(cur.getColumnIndex("address")),
                    nickName:cur.getString(cur.getColumnIndex("person")),
                    message:cur.getString(cur.getColumnIndex("body")),
                    date:cur.getString(cur.getColumnIndex("date")),
                };
            }    
            return message;
        }
        
    },

    sayHello:function(){
        console.info("hello world");
    }
}

module.exports = AutoLibSms;