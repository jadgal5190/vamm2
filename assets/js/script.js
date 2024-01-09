var app = new Vue({
    el: "#app",
    data: {
        modal:false,
        createModal:false,
        isEdit:false,
        loadModal:false,
        selectedItemIndex:0,
        jsonData:"",
        create:{
            ownerNumber:"1",ownerName:"as",buyerName:"a",buyerNumber:0,SellerName:"aa",SellerNumber:"aa",allprice:0,restprice:0,bianeprice:0, ownerPrice:0
        },
        items:[
            {ownerNumber:"1",ownerName:"as",buyerName:"a",buyerNumber:0,SellerName:"aa",SellerNumber:"aa",allprice:0,restprice:0,bianeprice:0, ownerPrice:0},
            {ownerNumber:"asd",ownerName:"as",buyerName:"a",buyerNumber:0,SellerName:"aa",SellerNumber:"aa",allprice:0,restprice:0,bianeprice:0, ownerPrice:0},
        ],
    },
    computed: {
        loadItem: function() {
            return (index) => {
              app.modal = true
              app.selectedItemIndex = index
            }
        },
        deleteItem: function() {
            return (index) => {
            app.items.splice(app.selectedItemIndex, 1)
            app.modal = false
            localStorage.setItem("sanadItems", JSON.stringify(app.items))
            }
        },
        createItem: function() {
            return (index) => {
            app.createModal = true
            app.isEdit = false
            app.create = {
                ownerNumber:"",ownerName:"",buyerName:"",buyerNumber:"",SellerName:"",SellerNumber:"",allprice:"",restprice:"",bianeprice:"", ownerPrice:""
            }
            localStorage.setItem("sanadItems", JSON.stringify(app.items))
            }
        },
        saveItems: function() {
            return () => {
                if (!app.isEdit) {
                    app.items.push(app.create)
                }else{
                    app.items[app.selectedItemIndex] = app.create
                }
                app.createModal = false
                localStorage.setItem("sanadItems", JSON.stringify(app.items))
            }
        },
        editItem:function(){
            return()=>{
                app.createModal = true
                app.isEdit = true
                app.create = app.items[app.selectedItemIndex]
            }
        },
        loadList:function(){
            return()=>{
            app.loadModal = true
            }
        },
        loadItems:function(){
            return()=>{
            app.items = JSON.parse(app.jsonData)
            app.loadModal = false
            localStorage.setItem("sanadItems", JSON.stringify(app.items))
            app.jsonData = ""
            }
        },
        copyList:function(){
            return()=>{
                navigator.clipboard.writeText(JSON.stringify(app.items));
            }
        },
        
    },
  
})


setTimeout(() => {
    app.items = JSON.parse(localStorage.getItem("sanadItems")) ? JSON.parse(localStorage.getItem("sanadItems")) : []
}, 100);