var app = new Vue({
    el: "#app",
    data: {
        showlogs:false,
        showDebtors:false,
        nameModal:false,
        nameValue:"",
        nameID:0,
        items:{
         "water":{price:5000, label:"آب معدنی"},
         "jack":{price:45000, label:"انرزی زا جک"},
         "smoke":{price:5000, label:"سیگار 1"},
         "smoke2":{price:10000, label:"سیگار 2"},
         "hype":{price:65000, label:"انرژی زا هایپ"},
         "mogomogo":{price:25000, label:"موگو موگو"},
         "zaferani":{price:30000, label:"نوشیدنی زعفران"},
         "vitaminC":{price:30000, label:"ویتامین c"},
         "limonade":{price:30000, label:"لیموناد"},
   
    },
       priceList: {
            "ps5":{
                1: 60000,
                2: 60000,
                3: 70000,
                4: 80000,
                5: 90000,
                6: 100000,
            },
            "ps4":{
                1: 50000,
                2: 50000,
                3: 60000,
                4: 60000,
                5: 80000,
                6: 90000,
            }
        },
        consoleList: [
            { id: 0, name: "کنسول 1", count: 2, timer: { h: '00', m: '00', s: '00' }, price: 0, toggleTimer: false, startTime: 0, timerprice: 0, pause: false, pauseTimer: 0, date:"", gamePrice:0, items:[], consoleType:"ps5", priceMax:0},
            { id: 1, name: "کنسول 2", count: 2, timer: { h: '00', m: '00', s: '00' }, price: 0, toggleTimer: false, startTime: 0, timerprice: 0, pause: false, pauseTimer: 0, date:"", gamePrice:0, items:[], consoleType:"ps4", priceMax:0},
            { id: 2, name: "کنسول 3", count: 2, timer: { h: '00', m: '00', s: '00' }, price: 0, toggleTimer: false, startTime: 0, timerprice: 0, pause: false, pauseTimer: 0, date:"", gamePrice:0, items:[], consoleType:"ps4", priceMax:0},
            { id: 3, name: "کنسول 4", count: 2, timer: { h: '00', m: '00', s: '00' }, price: 0, toggleTimer: false, startTime: 0, timerprice: 0, pause: false, pauseTimer: 0, date:"", gamePrice:0, items:[], consoleType:"ps4", priceMax:0},
        ],
        loglist:[],
        debtorlist:[],
        addItemModal:{
            name:"",
            price:"",
            toggle:false,
            selectedConsoleId:1,
            selectedConsoleIndex:0,
            count:1,
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
        changeItem: function() {
            return (name) => {
              app.addItemModal.price = app.items[app.addItemModal.name].price
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
                        app.consoleList[i].items.push({name:"بازی "+app.consoleList[i].count+"نفره", price:Number(fixNumbers(app.consoleList[i].price))})
                        app.consoleList[i].startTime = 0
                        app.consoleList[i].timerprice = 0
                        app.consoleList[i].toggleTimer = false
                        localStorage.setItem(i, JSON.stringify(app.consoleList[i]))
                        setTimeout(() => {
                        app.$forceUpdate()
                        }, 500);
                    }
                }
            }
        },
        cleardata: function() {
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
        deldebtor: function() {
            return (index) => {
                app.debtorlist.splice(index, 1)
                localStorage.setItem('debtorlist', JSON.stringify(app.debtorlist))
            }
        },
        loadDebtor: function() {
            return (debtor) => {
                if (!app.consoleList[debtor.index].toggleTimer) {
                    app.consoleList[debtor.index] = debtor
                    let vak = Math.floor(new Date().getTime() / 1000) - app.consoleList[debtor.index].pauseTimer
                    app.consoleList[debtor.index].startTime += vak
                    
                    app.showDebtors = false
                }
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
        adddebtor: function() {
            return () => {
                for (let i = 0; i < app.consoleList.length; i++) {
                    if (app.consoleList[i].id == app.nameID) {
                        app.consoleList[i].Ownername = app.nameValue
                 setTimeout(() => {
                    let now = new Date().toLocaleString("en-US")
                    app.debtorlist.push({index:i, id:app.consoleList[i].id, name:app.consoleList[i].name, count: app.consoleList[i].count, timer: app.consoleList[i].timer, toggleTimer: app.consoleList[i].toggleTimer, startTime: app.consoleList[i].startTime, timerprice: app.consoleList[i].timerprice, pause: true, pauseTimer: Math.floor(new Date().getTime() / 1000), gamePrice:app.consoleList[i].gamePrice, items:app.consoleList[i].items, consoleType:app.consoleList[i].consoleType, priceMax:app.consoleList[i].priceMax, Ownername:app.consoleList[i].Ownername, price:app.consoleList[i].price, date:now})
                    localStorage.setItem('debtorlist', JSON.stringify(app.debtorlist))
                    app.nameModal = false
                    app.nameValue = ''
                    // app.nameID = 0
                    app.cleardata(app.nameID)
                 }, 500);
                    }
                }
            }
        },
        showNameModal: function() {
            return (id) => {
                for (let i = 0; i < app.consoleList.length; i++) {
                    if (app.consoleList[i].id == id) {
                        app.nameModal = true
                        app.nameID = app.consoleList[i].id
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
                        app.addItemModal.name = app.items[app.addItemModal.name] ? app.items[app.addItemModal.name].label : app.addItemModal.name
                        app.consoleList[app.addItemModal.selectedConsoleId].items.push({name:app.addItemModal.name, price:Number(app.addItemModal.price), count:Number(app.addItemModal.count)})
                        localStorage.setItem(app.addItemModal.selectedConsoleId, JSON.stringify(app.consoleList[app.addItemModal.selectedConsoleId]))
                        setTimeout(() => {
                            app.addItemModal.name = ""
                            app.addItemModal.price = ""
                            app.addItemModal.count = 1
                            app.addItemModal.toggle = false
                            
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
app.debtorlist = JSON.parse(localStorage.getItem('debtorlist')) ? JSON.parse(localStorage.getItem('debtorlist')) : []

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
app.not = localStorage.getItem("not") ? localStorage.getItem("not") : false
if (!app.not) {
        Notification.requestPermission();
        app.not = true
        localStorage.setItem("not",app.not)
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
                   ItemsPrice += Number(app.consoleList[i].items[d].price) * app.consoleList[i].items[d].count
                }
                let selectedConsole = app.priceList[app.consoleList[i].consoleType]
                let allPrice = new Intl.NumberFormat("fa").format(Math.floor(hour * selectedConsole[Number(app.consoleList[i].count)]) + ItemsPrice)
              
                app.consoleList[i].gamePrice = Math.floor(hour * selectedConsole[Number(app.consoleList[i].count)])
                app.consoleList[i].price = allPrice
                if (app.consoleList[i].gamePrice >= app.consoleList[i].priceMax && app.consoleList[i].priceMax) {
                        var context = new AudioContext();
                        var oscillator = context.createOscillator();
                        oscillator.type = "sine";
                        oscillator.frequency.value = 800;
                        oscillator.connect(context.destination);
                        oscillator.start();
                        // Beep for 500 milliseconds
                        setTimeout(function () {
                            oscillator.stop();
                            app.consoleList[i].priceMax = 0
                        }, 500);
                }
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
