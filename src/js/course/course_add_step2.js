define(['jquery', 'common', 'header', 'aside', 'nprogress', 'loading', 'template', 'jqueryForm', 'uploadify', 'jcrop'], 
	function($, common, undefined, undefined, nprogress, loading, template, undefined, undefined, undefined) {
	
	
	/**
	 * 0、设置课程详细信息左侧导航
	 * 1、获取url查询字符串中的cs_id
	 * 2、利用这个cs_id请求接口获取当前课程的基本信息，渲染页面进行数据回显
	 * 3、数据回显后，初始化图片上传插件
	 * 4、数据回显后，初始化图片裁剪插件
	 * */
	
	// 0、设置课程详细信息左侧导航
	function initAddAside() {
		$('.forwards a').removeClass('active').eq(1).addClass('active');
	}
	
	// 1、获取url查询字符串中的cs_id
	var csId = common.parseSearch('cs_id');
	
	// 2、利用这个cs_id请求接口获取当前课程的基本信息，渲染页面进行数据回显
	$.get('/v6/course/picture', { cs_id: csId }, function(data) {
		if(data.code == 200) {
			$('.steps').html(template('add-step2-tpl', data.result));
			
			// 页面渲染完毕后，初始化相关插件
			uploadFile();
			initAddAside();
		}
	});
	
	// 3、数据回显后，初始化图片上传插件
	function uploadFile() {
		$('#upfile').uploadify({
			swf: '/lib/uploadify/uploadify.swf',
			uploader: '/v6/uploader/cover',
			fileObjName: 'cs_cover_original',
			formData: {
				cs_id: csId
			},
			itemTemplate: '<i></i>',
			buttonText: '选择图片',
			height: '100%',
			width: '100%',
			buttonClass: 'btn btn-success btn-sm',
			onUploadSuccess: function(file, data, response) {

				// 获取到的data是一个字符串，需要手动解析，如果解析报错，那么赋值为一个空对象
				try {
					data = JSON.parse(data);
				}catch(e) {
					data = {};
				}
				
				if(data.code == 200) {
					$('.preview img').attr('src', data.result.path);
				}
			}
		});
	}
	
	// 4、数据回显后，初始化图片裁剪插件
	// 这个插件默认会按照图片原大小初始化插件
	var clipResult = {};
	$(document).on('click', '#clip-btn', function() {
		
		var $self = $(this);
		
		// 如果是裁切图片，那么初始化这个图片裁剪插件
		if ($self.text() === '裁切图片') {
			
			$('.preview img').Jcrop({
				aspectRatio: 2,						// 设置宽高比
				setSelect: [0, 0, 100, 100],    	// 设置图片默认的裁剪
				boxHeight: 400,  					// 限制插件最大高
				boxWidth: 400						// 限制插件最大宽
			}, function() {
		
				// 通过实例.container可以获取这个插件的父容器，父容器可以监听该插件提供的一些事件
				this.container.on('cropend',function(e,s,c){
					
					// 这个结果是相对于图片原尺寸来计算的，最终的值传给后台，后台就会对原图进行裁剪
				    console.log(c.x, c.y, c.w, c.h);
				    
				    // 裁剪结果后，把结果存储到一个外界变量，供大家使用
				    clipResult = c;
				});
				
				// 插件初始化好了，按钮更新为保存状态
				$self.text('保存');
			});
		}
		
		// 如果不是，则上传裁剪结果
		else {
			$.ajax({
				type: 'post',
				url: '/v6/course/update/picture',
				data: {
					cs_id: csId,
					x: clipResult.x,
					y: clipResult.y,
					w: clipResult.w,
					h: clipResult.h
				},
				success: function(data) {
					data.code == 200 && (location.href = '/html/course/course_add_step3.html?cs_id=' + csId);
				}
			});
		}

	});
	
	nprogress.done();
});
