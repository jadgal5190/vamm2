var app = new Vue({
    el: "#app",
    data: {
        showlogs:false,
        priceList: {
            1: 30000,
            2: 40000,
            4: 60000,
            5: 70000,
            6: 80000,
        },
        consoleList: [
            { id: 0, name: "کنسول 1", count: 2, timer: { h: '00', m: '00', s: '00' }, price: 0, toggleTimer: false, startTime: 0, timerprice: 0, pause: false, pauseTimer: 0, date:"", gamePrice:0, items:[{name:"test", price:1000}], consoleType:"ps5"},
            { id: 1, name: "کنسول 2", count: 2, timer: { h: '00', m: '00', s: '00' }, price: 0, toggleTimer: false, startTime: 0, timerprice: 0, pause: false, pauseTimer: 0, date:"", gamePrice:0, items:[{name:"test", price:1000}], consoleType:"ps4"},
            { id: 2, name: "کنسول 3", count: 2, timer: { h: '00', m: '00', s: '00' }, price: 0, toggleTimer: false, startTime: 0, timerprice: 0, pause: false, pauseTimer: 0, date:"", gamePrice:0, items:[{name:"test", price:1000}], consoleType:"ps4"},
            { id: 3, name: "کنسول 4", count: 2, timer: { h: '00', m: '00', s: '00' }, price: 0, toggleTimer: false, startTime: 0, timerprice: 0, pause: false, pauseTimer: 0, date:"", gamePrice:0, items:[{name:"test", price:1000}], consoleType:"ps4"},
        ],
        loglist:[],
        addItemModal:{
            name:"",
            price:"",
            toggle:false,
            selectedConsoleId:1,
            selectedConsoleIndex:0,
        }
    },
    computed: {
        changeCount: function() {
            return (id) => {
                    // for (let i = 0; i < app.consoleList.length; i++) {
                    //     if (app.consoleList[i].id == id) {
                    //       app.consoleList[i].lastprice += app.consoleList[i].lastprice + Number(fixNumbers(app.consoleList[i].price))
                    //       app.consoleList[i].price = 0
                    //       app.consoleList[i].timerprice = 0
                    //       app.consoleList[i].timerprice = 0
                    //       app.consoleList[i].timerprice = 0
                    //       app.consoleList[i].timerprice = 0
                    //       app.consoleList[i].timerprice = 0
                    //     }
                    // }
                    // setTimeout(() => {
                    //     app.$forceUpdate()
                    //     }, 500);
            }
        },
        // addConsole: function() {
        //     return () => {
        //         let idss = Math.floor(Math.random() * 100000)
        //         app.consoleList.push({ id: idss, name: "کنسول 1", count: 6, timer: { h: '00', m: '00', s: '00' }, price: 0, toggleTimer: false, startTime: 0, timerprice: 0, pause: false, pauseTimer: 0, })
        //         localStorage.setItem(idss, JSON.stringify({ id: idss, name: "کنسول 1", count: 6, timer: { h: '00', m: '00', s: '00' }, price: 0, toggleTimer: false, startTime: 0, timerprice: 0, pause: false, pauseTimer: 0, }))
        //     }
        // },
        // deleteConsole: function() {
        //     return (id) => {
        //         console.log(id);
        //         for (let i = 0; i < app.consoleList.length; i++) {
        //             if (app.consoleList[i].id == id && !app.consoleList[i].toggleTimer) {
        //                 app.consoleList.splice(i, 1)
        //             }
        //         }
        //     }
        // },
        startTimer: function() {
            return (id) => {
                for (let i = 0; i < app.consoleList.length; i++) {
                    if (app.consoleList[i].id == id && !app.consoleList[i].toggleTimer) {
                        app.consoleList[i].startTime = Math.floor(new Date().getTime() / 1000)
                        app.consoleList[i].toggleTimer = true
                            // localStorage.setItem(i, JSON.stringify(app.consoleList[i]))
                            setTimeout(() => {
                                app.$forceUpdate()
                                }, 500);
                    }
                }
            }
        },
        resetTimer: function() {
            return (id) => {
                for (let i = 0; i < app.consoleList.length; i++) {
                    if (app.consoleList[i].id == id && app.consoleList[i].toggleTimer) {
                        app.loglist.push(app.consoleList[i])
                        app.consoleList[i].date =   new Date().toLocaleString("en-US")
                        localStorage.setItem('logs', JSON.stringify(app.loglist))
                        app.consoleList[i].startTime = 0
                        app.consoleList[i].timerprice = 0
                        app.consoleList[i].toggleTimer = false
                        app.consoleList[i].pause = false
                        app.consoleList[i].timer = { h: '00', m: '00', s: '00' }
                        app.consoleList[i].date = ''
                        app.consoleList[i].price = 0
                        app.consoleList[i].items = []
                        app.consoleList[i].count = 2
                        localStorage.setItem(i, JSON.stringify(app.consoleList[i]))
                        setTimeout(() => {
                        app.$forceUpdate()
                        app.loglist = JSON.parse(localStorage.getItem('logs')) ? JSON.parse(localStorage.getItem('logs')) : []
                        }, 500);
                    }
                }
            }
        },
        pauseTimer: function() {
            return (id) => {
                for (let i = 0; i < app.consoleList.length; i++) {
                    if (app.consoleList[i].id == id && app.consoleList[i].toggleTimer && !app.consoleList[i].pause) {
                        app.consoleList[i].pause = true
                        app.consoleList[i].pauseTimer = Math.floor(new Date().getTime() / 1000)
                    } else if (app.consoleList[i].id == id && app.consoleList[i].toggleTimer && app.consoleList[i].pause) {
                        let vak = Math.floor(new Date().getTime() / 1000) - app.consoleList[i].pauseTimer
                        app.consoleList[i].startTime += vak
                        app.consoleList[i].pause = false
                    }
                    localStorage.setItem(i, JSON.stringify(app.consoleList[i]))
                    setTimeout(() => {
                        app.$forceUpdate()
                        }, 500);
                }
            }
        },
        dellog: function() {
            return (index) => {
                app.loglist.splice(index, 1)
                localStorage.setItem('logs', JSON.stringify(app.loglist))
            }
        },
        addItem: function() {
            return (id) => {
                for (let i = 0; i < app.consoleList.length; i++) {
                    if (app.consoleList[i].id == id) {
                        app.addItemModal.selectedConsoleId = i
                        app.addItemModal.toggle = true
                    }
                }
            }
        },
        delItem: function() {
            return (itemIndex) => {
                        app.consoleList[app.addItemModal.selectedConsoleId].items.splice(itemIndex, 1)
                        localStorage.setItem(app.addItemModal.selectedConsoleId, JSON.stringify(app.consoleList[app.addItemModal.selectedConsoleId]))
            }
        },
        addItemInConsole: function() {
            return () => {
                        app.consoleList[app.addItemModal.selectedConsoleId].items.push({name:app.addItemModal.name, price:Number(app.addItemModal.price)})
                        localStorage.setItem(app.addItemModal.selectedConsoleId, JSON.stringify(app.consoleList[app.addItemModal.selectedConsoleId]))
                        setTimeout(() => {
                            app.addItemModal.name = ""
                            app.addItemModal.price = ""
                            }, 500);
                        
            }
        },
    },
    watch: {
        consoleList: {
            handler: function(val, oldVal) {
                var vm = this;
                val.filter(function(p, idx) {
                    return Object.keys(p).some(function(prop) {
                        if (p.id == vm.consoleList[idx].id) {
                            // let hour = p.timerprice / 3600
                            // vm.consoleList[idx].price = new Intl.NumberFormat("fa").format(Math.floor(hour * app.priceList[p.count]))
                            // app.$forceUpdate()
                        }
                    })
                });
            },
            deep: true
        }
    },
})

for (let i = 0; i <= 3; i++) {
    if (localStorage.getItem(i)) {
        app.consoleList[i] = JSON.parse(localStorage.getItem(i))
    }
}
app.loglist = JSON.parse(localStorage.getItem('logs')) ? JSON.parse(localStorage.getItem('logs')) : []
setTimeout(() => {
    app.$forceUpdate()
    }, 1000);

function secondsToHms(d, id) {
    d = Number(Math.abs(d));
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
    var hDisplay = h > 0 ? h + (h == 1 ? "" : "") : "00";
    var mDisplay = m > 0 ? m + (m == 1 ? "" : "") : "00";
    var sDisplay = s > 0 ? s + (s == 1 ? "" : "") : "00";
    for (let i = 0; i < app.consoleList.length; i++) {
        if (app.consoleList[i].toggleTimer && app.consoleList[i].id == id) {
            app.consoleList[i].timer.h = hDisplay
            app.consoleList[i].timer.m = mDisplay
            app.consoleList[i].timer.s = sDisplay
            app.consoleList[i].timerprice = d
        }
    }
}

setInterval(function() {
    for (let i = 0; i < app.consoleList.length; i++) {
        if (app.consoleList[i].toggleTimer) {
            if (!app.consoleList[i].pause) {
                let seconds = Math.floor(new Date().getTime() / 1000);
                if (app.consoleList[i].timerprice == 0) {
                    setTimeout(() => {
                       secondsToHms(app.consoleList[i].startTime - seconds, app.consoleList[i].id)
                    }, 100);
                }else{
                    secondsToHms(app.consoleList[i].startTime - seconds, app.consoleList[i].id)
                }
                let hour = app.consoleList[i].timerprice / 3600
                let ItemsPrice = 0
                for (let d = 0; d < app.consoleList[i].items.length; d++) {
                   ItemsPrice += Number(app.consoleList[i].items[d].price)
                }
                let allPrice = new Intl.NumberFormat("fa").format(Math.floor(hour * app.priceList[Number(app.consoleList[i].count)]) + ItemsPrice)
              
                app.consoleList[i].gamePrice = Math.floor(hour * app.priceList[Number(app.consoleList[i].count)])
                app.consoleList[i].price = allPrice
                localStorage.setItem(i, JSON.stringify(app.consoleList[i]))
            }
            setTimeout(() => {
                app.$forceUpdate()
                }, 500);
        } else {
            app.consoleList[i].timer.h = '00'
            app.consoleList[i].timer.m = '00'
            app.consoleList[i].timer.s = '00'
        }
    }
}, 500);

// setInterval(function() {
//     for (let i = 0; i < app.consoleList.length; i++) {
//         if (app.consoleList[i].toggleTimer) {
//             if (!app.consoleList[i].pause) {
//                     let seconds = Math.floor(new Date().getTime() / 1000);
//                     secondsToHms(app.consoleList[i].startTime - seconds, app.consoleList[i].id)
//                     let allprice = 0
//                     for (const key in app.consoleList[i].timerprice) {
//                         if (app.consoleList[i].timerprice[key] != 0) {
//                             allprice = allprice +  Math.floor((app.consoleList[i].timerprice[key] / 3600) * app.priceList[key])
//                         }
//                     }
//                     app.consoleList[i].price = new Intl.NumberFormat("fa").format(allprice)
//                     localStorage.setItem(i, JSON.stringify(app.consoleList[i]))
//             }
//             setTimeout(() => {
//                 app.$forceUpdate()
//                 }, 500);
//         } else {
//             app.consoleList[i].timer.h = '00'
//             app.consoleList[i].timer.m = '00'
//             app.consoleList[i].timer.s = '00'
//         }
//     }
// }, 500);

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

var
persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
arabicNumbers  = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g],
fixNumbers = function (str)
{
  if(typeof str === 'string')
  {
    for(var i=0; i<10; i++)
    {
      str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
    }
  }
  return str;
};