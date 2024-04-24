const adminAction = [

    {
      id: 1001,
      actionName: "Add Item",
      imgUrl: "./images/admin/AddItem.jpeg",
      desc: "Add New Food Items",
      link: "/admin/createfood"
    },


    {
        id: 1002,
        actionName: "Edit Item",
        imgUrl: "./images/admin/EditItem.jpeg",
        desc: "Update food item",      
        link: "/admin/update"
    },
    

    {
      id: 1003,
      actionName: "Delete Item",
      imgUrl: "./images/admin/DeleteItem.jpeg",
      desc: "Permanently Remove any food item",
      link: "/admin/delete"
    },


    {
        id: 1004,
        actionName: "Help Requests",
        imgUrl: "./images/admin/HelpRequests.jpeg",
        desc: "View pending Help Requests",
        link: "/admin/viewqueries"
    },

    {
        id: 1005,
        actionName: "Past Orders",
        imgUrl: "./images/admin/PastOrders.jpeg",
        desc: "View Past Orders. Sort refund issues",
        link: "/admin/vieworders"

    },

    {
        id: 1006,
        actionName: "ShopTimings",
        imgUrl: "./images/admin/ShopTimings.jpeg",
        desc: "Change the shop timings. Declare a holiday",
        link: "/"
    }


  ];
  
  export default adminAction;
  