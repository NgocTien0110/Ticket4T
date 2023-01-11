let helper = {};
helper.date = (date) => {
    if (typeof date == 'object')
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    return date.split('-').join('/');
}

helper.date1 = (date) => {
    if (typeof date == 'object')
        return date.getFullYear(); + '/' + (date.getMonth() + 1) + '/' + date.getDate()
    return date.split('-').join('/');
}

// tổng thời gian
helper.totalTime = (date1, date2, time1, time2) => {
    //dd-mm-yyyy -> yyyy-mm-dd
    date1 = date1.split('-').reverse().join('-');
    date2 = date2.split('-').reverse().join('-');
    // chuyển về dạng date
    let dateTime1 = date1 + ' ' + time1;
    let dateTime2 = date2 + ' ' + time2;
    dateTime1 = new Date(dateTime1);
    dateTime2 = new Date(dateTime2);
    var time = dateTime2.getTime() - dateTime1.getTime();
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

helper.simpleMath = (a, b, expression) => {
    let tmp1 = parseFloat(a);
    let tmp2 = parseFloat(b);
    let str = '';

    if (expression == '+')
        str = toString(a + b);
    else if (expression == '-')
        str = toString(a - b);
    return str;
}

helper.createNextPreviousPagination = (id, page, star, totalPage, type, pageType) => {
    let str = ''
    page = parseInt(page);
    totalPage = parseInt(totalPage);

    if (totalPage == 0)
        return str;

    if (page > totalPage || page < 1)
        str = '<a class="page-link disabled" href="/nha-xe/';
    else
        str = '<a class="page-link" href="/nha-xe/';

    if (pageType == 'review')
        str += id + '?page=' + page + '&star=' + star + '#review-section">';
    else if (pageType == 'nhaxe') {
        str += '?page=' + page + '">';
    }

    if (type == "previous")
        str += 'Previous</a>';
    else
        str += 'Next</a>';

    return str;
}

helper.createReviewPagination = (id, current, star, totalPage) => {
    let top = '<li class="page-item\"><a class=\"page-link\" href=';
    let pickedTop = '<li class="page-item active\"><a class=\"page-link\" href=';
    let bot = '&star=' + star + '#review-section">';
    let str = '';
    let href = '"/nha-xe/' + id + '?page='
    current = parseInt(current);

    for (i = 1; i <= totalPage; ++i) {
        if (current == i)
            str += pickedTop
        else
            str += top
        str += href + i + bot + i + '</a></li>';
    }

    return str;
}

helper.createNextPrevTicketPagination = (ticketStatus, newPage, pageStatus, buttonType) => {
    let str = '<a class="page-link';
    let end = '">' + buttonType + '</a>';

    if (pageStatus == false)
        return str + " disabled\"" + end;

    else
        str += "\"";

    str += "href=\"/tai-khoan/ve-cua-toi?";
    if (ticketStatus == 'Vừa đặt') {
        str += "page=";
    }
    else
        str += "statusTicket=" + ticketStatus + "&page=";

    str += newPage + end;
    return str;
}

helper.createTicketPagination = (ticketStatus, currentPage, totalPage) => {
    let str = '';
    for (i = 1; i <= totalPage; ++i) {
        let href = '/tai-khoan/ve-cua-toi?'
        if (ticketStatus != 'Vừa đặt')
            href += "statusTicket=" + ticketStatus + "&";
        href += "page=" + i;

        str += '<li class="page-item';
        if (i == currentPage)
            str += " active";

        str += '"><a class="page-link" ' + 'href="' + href + '"">' + i + '</a></li>';
    }
    return str;
}

// pagination for search-trip
helper.SearchTripPagination = (page, limit, totalRows, queryParams) => {
    let str = '';
    let totalPage = Math.ceil(totalRows / limit);
    let href = '/search-trip?page=';

    if (totalPage == 0)
        return str;

    str += '<li class="page-item';
    if (page == 1)
        str += ' disabled"><a class="page-link" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>';
    else
        str += '"><a class="page-link" href="' + href + (page - 1) + queryParams + '" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>';

    for (i = 1; i <= totalPage; ++i) {
        str += '<li class="page-item';
        if (i == page)
            str += ' active';
        str += '"><a class="page-link" href="' + href + i + queryParams + '">' + i + '</a></li>';
    }

    str += '<li class="page-item';
    if (page == totalPage)
        str += ' disabled"><a class="page-link" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>';
    else
        str += '"><a class="page-link" href="' + href + (page + 1) + queryParams + '" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>';

    return str;
}
helper.ViewListTicketPagination = (page, totalPage, queryParams) => {
    let str = '';
    let href = '/dashBoard/quanlyve?page=';

    if (totalPage == 0)
        return str;

    str += '<li class="page-item';
    if (page == 1)
        str += ' disabled"><a class="page-link" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>';
    else
        str += '"><a class="page-link" href="' + href + (page - 1) + queryParams + '" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>';

    for (i = 1; i <= totalPage; ++i) {
        str += '<li class="page-item';
        if (i == page)
            str += ' active';
        str += '"><a class="page-link" href="' + href + i + queryParams + '">' + i + '</a></li>';
    }

    str += '<li class="page-item';
    if (page == totalPage)
        str += ' disabled"><a class="page-link" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>';
    else
        str += '"><a class="page-link" href="' + href + (page + 1) + queryParams + '" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>';

    return str;
}


helper.createChuyenXeManagementPagination = (totalPage, currentPage) => {
    let str = "<li class=\"page-item ";

    if (currentPage == 1)
        str += "disabled";
    str += "\"><a class=\"page-link\" href=\"/dashboard/quanlychuyenxe?page=" + (parseInt(currentPage) - 1)
        + "\">Previous</a></li>";

    for (i = 1; i <= totalPage; ++i) {
        str += "<li class=\"page-item "
        if (i == currentPage)
            str += "active";
        str += "\"><a class=\"page-link\" href=\""
            + "/dashboard/quanlychuyenxe?page=" + i
            + "\">"
            + i + " </a></li>"
    }

    str += "<li class=\"page-item ";
    if (currentPage == totalPage)
        str += "disabled";
    str += "\"><a class=\"page-link\" href=\"/dashboard/quanlychuyenxe?page=" + (parseInt(currentPage) + 1)
        + "\">Next</a></li>";

    return str;
}

helper.createNhaXeManagementPagination = (totalPage, currentPage) => {
    let str = '<li class="page-item ';

    if (currentPage == 1) str += "disabled";
    str +=
        '"><a class="page-link" href="/dashboard/quanlynhaxe?page=' +
        (parseInt(currentPage) - 1) +
        '">Previous</a></li>';

    for (i = 1; i <= totalPage; ++i) {
        str += '<li class="page-item ';
        if (i == currentPage) str += "active";
        str +=
            '"><a class="page-link" href="' +
            "/dashboard/quanlynhaxe?page=" +
            i +
            '">' +
            i +
            " </a></li>";
    }

    str += '<li class="page-item ';
    if (currentPage == totalPage) str += "disabled";
    str +=
        '"><a class="page-link" href="/dashboard/quanlynhaxe?page=' +
        (parseInt(currentPage) + 1) +
        '">Next</a></li>';

    return str;
};

helper.toDate = (dateString) => {

    let temp = dateString.split('-');

    return temp[2] + '-' + temp[1] + '-' + temp[0]
}

helper.checkMinMaxPrice = (minPrice, maxPrice) => {
    let str = '';
    minPrice = parseFloat(minPrice);
    maxPrice = parseFloat(maxPrice);

    if (minPrice === maxPrice)
        str = "Giá vé: " + helper.formatPrice(minPrice) + "đ";
    else
        str = "Giá vé: Từ " + helper.formatPrice(minPrice) + "đ đến " + helper.formatPrice(maxPrice) + "đ";

    return str;
}
module.exports = helper;