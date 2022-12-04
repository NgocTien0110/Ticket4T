let helper={};
helper.date=(time)=>{
    //dd/mm/yyyy
    let date=new Date(time);
    let day=date.getDate();
    let month=date.getMonth()+1;
    let year=date.getFullYear();
    if(day<10){
        day='0'+day;
    }
    if(month<10){
        month='0'+month;
    }
    return day+'/'+month+'/'+year;
}
helper.time=(time)=>{
    //hh:mm
    let date=new Date(time);
    let hour=date.getHours();
    let minute=date.getMinutes();
    if(hour<10){
        hour='0'+hour;
    }
    if(minute<10){
        minute='0'+minute;
    }
    return hour+':'+minute;
}
// tổng thời gian
helper.totalTime=(time1,time2)=>{
    let date1=new Date(time1);
    let date2=new Date(time2);
    var time=date2.getTime()-date1.getTime();
    var hour=Math.abs(Math.floor(time/(1000*60*60)));
    var minute=Math.abs(Math.floor((time%(1000*60*60))/(1000*60)));

    if(minute<10){
        minute='0'+minute;
    }
    if(minute==0){
        return hour+' giờ';
    }
    return hour+' giờ '+minute+' phút';

    
}
helper.totalPrice=(price,quantity)=>{
    return price*quantity;
}

module.exports=helper;