//  pida.js 0.0.1
//  @gihub.com/penouc
//	Pida may be freely distributed under the MIT license

+function(){

	var root = this;

	var _ = function(obj){
		if(obj instanceof _)return _;
		if(!(this instanceof _))return new _(obj);
		this.wrapped = obj;
	};

	//抹平数组
	var flatten = function(arr,outer){
		var len = arr.length,
			ret = !outer? []:outer;

		for (var i = 0; i < len; i++) {
			if(typeof arr[i] == 'number' || typeof arr[i] == 'string'){
				ret.push(arr[i])
			}else{
				flatten(arr[i],ret);
			}
		};

		return ret;
	}

	_.flatten = function(arr,outer){
		return flatten(arr,outer);
	}

	//数组去重
	_.unique = function(arr){
		var len = arr.length,
			hash = {},
			ret = [];

		for (var i = 0; i < len; i++) {
			var k = arr[i];
			if(!hash[k]){
				hash[k] = 1;
				ret.push(k);
			}
		};
		return ret;
	}

	//解析url
	_.parseUrl = function(url){
		var a  = document.createElement('a');

		a.href = url;

		return {
			protocol: a.protocol.replace(/:/,''),
			host: a.hostname,
			path: a.pathname,
			query: a.search.replace(/^\?/,''),
			params: (function(){
				var ret = {},
					seg = a.search.replace(/^\?/,'').split('&'),
					s;
				for (var i = 0; i < seg.length; i++) {
					if(!seg[i]) continue;
					s = seg[i].split('=');
					ret[s[0]] = s[1];
				};
				return ret;
			})(),
			hash: a.hash.replace('#','')
		}
	}

	if(typeof define === 'function' && define.amd){
		define('pida',[],function(){
			return _;
		})
	}else{
		root._ = _;
	}
}()
