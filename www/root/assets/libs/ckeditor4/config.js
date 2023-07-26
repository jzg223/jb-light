/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For complete reference see:
	// https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_config.html

	// The toolbar groups arrangement, optimized for two toolbar rows.
		// Define changes to default configuration here. For example:
		// config.language = 'fr';
		// config.uiColor = '#AADC6E';
	config.removeDialogTabs = 'image:advanced;image:Link';//隐藏超链接与高级选项
	config.filebrowserImageUploadUrl = fj_url+'upload';//上传图片的地址
	config.filebrowserHtml5videoUploadUrl = fj_url+'upload';//上传视频的地址
	config.extraPlugins = 'html5video';
	config.image_previewText = ' '//设置图片预览默认值为' '
	
	config.toolbarGroups = [
		// { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
		// { name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
		// { name: 'links' },
		{ name: 'insert' },
		// { name: 'forms' },
		// { name: 'tools' },
		// { name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
		// { name: 'others' },
		// '/',
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		// { name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
		// { name: 'styles' },
		// { name: 'colors' },
		// { name: 'about' }
	];

	// Remove some buttons provided by the standard plugins, which are
	// not needed in the Standard(s) toolbar.
	config.removeButtons = 'Underline,Subscript,Superscript';

	// Set the most common block elements.
	config.format_tags = 'p;h1;h2;h3;pre';

	// Simplify the dialog windows.
	config.removeDialogTabs = 'image:advanced;link:advanced';
};

CKEDITOR.on('instanceReady', function (e) {

	e.editor.on('fileUploadResponse', function (evt) {
	  // Prevent the default response handler.
	  evt.stop();
	  var data = evt.data;
	  var res = data.fileLoader.xhr.responseText;
	  var res = JSON.parse(res);
	  if(200 == res.code){
		data.url = fj_url+res['message'];
	  }
	  // Get XHR and response.
	  // var data = evt.data,
	  //   xhr = data.fileLoader.xhr,
	  //   response = xhr.responseText.split('|');
	  // console.log(xhr);
	  // if (response[1]) {
	  //   // An error occurred during upload.
	  //   data.message = response[1];
	  //   evt.cancel();
	  // } else {
	  //   data.url = response[0];
	  // }
	});
  })

