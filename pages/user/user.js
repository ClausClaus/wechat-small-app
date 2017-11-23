Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      console.log('load');
    },
    ongetUserInfo(){
      wx.getUserInfo({
        success: function(res) {
          var userInfo = res.userInfo;
          var nickName = userInfo.nickName;
          var avatarUrl = userInfo.avatarUrl;
          var gender = userInfo.gender ;//性别 0：未知、1：男、2：女
          var province = userInfo.province;
          var city = userInfo.city;
          var country = userInfo.country;
          var signature = res.signature;
          var encryptData = res.encryptData;
          console.log('用户信息',res);
        },
        fail: function(res) {

        },
        complete: function(res) {

        }
      });
    },
    onchooseAddres(e) {
        wx.chooseAddress({
            success(res) {
                console.log(res);
            }
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
      console.log('ready');
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
      console.log('show')
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})
