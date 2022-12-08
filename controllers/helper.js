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

helper.starNhanXet = (stars) => {
    let str = '';
    let star = Math.round(stars);
    let halfStar = star - stars;
    // console.log(halfStar);
    let i;
    for (i = 1; i < star; i++) {
        str += '<i class="fa-solid fa-star"></i>';
    }
    if (halfStar > 0) {
        str += '<i class="fa-regular fa-star-half-stroke"></i>';
        i++;
    }
    for (; i <= 5; i++) {
        str += '<i class="fa-regular fa-star"></i>';
    }
    return str;
}
helper.generateStarList = (stars) => {
    let str = '', count = 0, decPart = stars % 1, intPart = Math.trunc(stars);

    for (i = 1; i <= intPart; ++i, ++count) {
        str += '<i class="bi bi-star-fill icon"></i>';
    }

    if (decPart >= 0.25 && decPart <= 0.5) {
        str += '<i class="bi bi-star-half icon"></i>';
        ++count;
    }
    else if (decPart > 0.5) {
        str += '<i class="bi bi-star-fill icon"></i>';
        ++count;
    }

    for (i = count; i < 5; ++i)
        str += '<i class="bi bi-star icon"></i>';

    return str;
}

helper.generateStarListFont2 = (stars) => {
    let str = '', count = 0, decPart = stars % 1, intPart = Math.trunc(stars);

    for (i = 1; i <= intPart; ++i, ++count) {
        str += '<i class="bi bi-star-fill comment-star"></i>';
    }

    if (decPart >= 0.25 && decPart <= 0.5) {
        str += '<i class="bi bi-star-half comment-star"></i>';
        ++count;
    }
    else if (decPart > 0.5) {
        str += '<i class="bi bi-star-fill comment-star"></i>';
        ++count;
    }

    for (i = count; i < 5; ++i)
        str += '<i class="bi bi-star comment-star"></i>';

    return str;
}

module.exports = helper;