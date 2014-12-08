var Util = {

    /**
     * Convert Object to JSON string
     * @param object
     * @returns {*}
     */
    toJSON : function(object){
        try {
            return JSON.stringify(object);
        } catch (e) {
            return null;
        }
    },

    /**
     * Convert JSON string to Object
     * @param json
     * @returns {*}
     */
    fromJSON : function(json){
        try {
            return JSON.parse(json);
        } catch (e) {
            return null;
        }
    },

    /**
     * To fixed float number
     * @param obj
     * @param fractionDigits
     * @returns {*}
     */
    toFixedFloat : function(obj, fractionDigits){
        fractionDigits = arguments[1] ? arguments[1]:2;
        with (Math) {
            try {
                return round(obj * pow(10, fractionDigits)) / pow(10, fractionDigits);
            } catch (e) {
                return null;
            }
        }
    },

    /**
     * Get the window.sessionStorage Object
     * @returns {Storage}
     */
    getSessionStorage : function(){
        try {
            return window.sessionStorage;
        } catch(e) {
            return null;
        }
    },

    getXMLHttpRequest : function (){
        if (XMLHttpRequest) {
            return new XMLHttpRequest();
        }else if (ActiveXObject) {
            return new ActiveXObject("Microsoft.XMLHTTP");
        }else{
            return null;
        }
    },

    /**
     * Send GET Request synchronously
     * @param url
     * @returns {Object}
     */
    doGetSync : function (url){
        var request = Util.getXMLHttpRequest();
        request.open('GET', url, false);
        request.send(null);
        if (request.status === 200) {
            var data = eval("(" + request.responseText + ")");
            return data;
        }else{
            return null;
        }
    },

    /**
     * Send GET Request asynchronously
     * @param url
     * @param callback
     * @returns {*}
     */
    doGetAsync : function (url, callback){
        return $.getJSON(url, callback);
    },

    doPostSync : function (url, data, callback){
        var request = Util.getXMLHttpRequest();
        request.open('POST', url, false);
        request.send(data);
        if (request.status === 200) {
            var data = eval("(" + request.responseText + ")");
            return data;
        }else{
            return null;
        }
    },

    /**
     * Send POST Request asynchronously
     * @param url
     * @param data
     * @param callback
     * @returns {*}
     */
    doPostAsync : function(url, data, callback){
        return $.post(url, data, callback);
    },

    /**
     * Build url in GET method
     * @param host
     * @param param
     * @returns {string}
     */
    buildGetUrl : function(host, param){
        var url = "";
        url += host;
        url += "?";
        try {
            $.each(param, function (key, value) {
                url += key;
                url += "=";
                url += value;
                url += "&";
            });
        } catch (e) {
            for(var key in param){
                url += key;
                url += "=";
                if (param.hasOwnProperty(key)) {
                    url += param[key];
                }
                url += "&";
            }
        }
        return url;
    },
    
    /**
     * Get request parameters in URL 
     * @param search location.search
     * @returns {object}
     */
    getURLParameters : function (search) {   
      //var search = location.search;
      var paramsObject = new Object();   
      if(search.indexOf("?") != -1) {   
        var searchs = search.substr(1);   
        var paramsArray = searchs.split("&");   
        for(var i = 0; i < strs.length; i ++) {   
           paramsObject[ paramsArray[i].split("=")[0] ] = unescape(paramsArray[i].split("=")[1]);   
        }   
      }   
      return paramsObject;   
    }   

    openLoadingDialog : function(){
        $.mobile.loading( 'show', {
            text: "正在加载...",
            textVisible: true,
            theme: "iosLoading"
        });
    },

    closeLoadingDialog : function(){
        $.mobile.loading( "hide" );
    },

    openPopupDialog : function(selector){
        $(selector).popup("open");
    },

    closePopupDialog : function(selector){
        $(selector).popup("close");
    },

    /**
     * Start another page
     * @param url the url/path of page
     */
    startPage : function(url){
        window.location.href = url;
    },

    refreshPage : function(){
        window.location.reload();
    },

    getText : function(selector){
        return $.trim($(selector).text());
    },

    getVal : function(selector){
        return $.trim($(selector).val());
    },
}
