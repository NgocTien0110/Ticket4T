let helper = {};
helper.date = (time) => {
    //dd/mm/yyyy
    let date = new Date(time);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }
    return day + '/' + month + '/' + year;
}
helper.time = (time) => {
    //hh:mm
    let date = new Date(time);
    let hour = date.getHours();
    let minute = date.getMinutes();
    if (hour < 10) {
        hour = '0' + hour;
    }
    if (minute < 10) {
        minute = '0' + minute;
    }
    return hour + ':' + minute;
}
// tổng thời gian
helper.totalTime = (time1, time2) => {
    let date1 = new Date(time1);
    let date2 = new Date(time2);
    var time = date2.getTime() - date1.getTime();
    var hour = Math.abs(Math.floor(time / (1000 * 60 * 60)));
    var minute = Math.abs(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));

    if (minute < 10) {
        minute = '0' + minute;
    }
    if (minute == 0) {
        return hour + ' giờ';
    }
    return hour + ' giờ ' + minute + ' phút';


}

helper.formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

helper.totalPrice = (price, quantity) => {
    let total = price * quantity;
    total = helper.formatPrice(total);
    return total;
}

helper.starNhanXet=(stars)=>{
    let str = '';
    let star = Math.round(stars);
    let halfStar = stars - star;
    let i;
    for(i=1;i<star;i++){
        str+='<i class="fas fa-star"></i>';
    }
    if(halfStar>0){
        str+='<i class="fas fa-star-half-alt"></i>';
        i++;
    }
    for(;i<=5;i++){
        str+='<i class="far fa-star"></i>';
    }
    return str;
}

module.exports = helper;