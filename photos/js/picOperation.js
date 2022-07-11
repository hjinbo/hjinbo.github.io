document.addEventListener("DOMContentLoaded", function() {

    var bucket = 'n-gallery-1305745742';
    var region = 'ap-guangzhou';

    var cos = new COS({
        SecretId: 'AKIDJTSAk7H4AuNltkyCmBE2I1iALxkHwBLF',
        SecretKey: 'nEhRcX6lHgsna5KFApDLBPN4dDXaw0xe',
    });

    var imgUrls = [];

    // 图片上传
    // $("#upload").click(function() {
    //     var fs = document.getElementById('file-selector');
    //     var fileObjects = fs.files;
    //     for (var i = 0; i < fileObjects.length; i++) {
    //         var fileObject = fileObjects[i];
    //         var fileName = fileObject.name;
    //         console.log(fileName);
    //         cos.putObject({
    //             Bucket: bucket, /* 必须 */
    //             Region: region,     /* 存储桶所在地域，必须字段 */
    //             Key: '/cartoon/' + fileName,              /* 必须 */
    //             StorageClass: 'STANDARD',
    //             Body: fileObject, // 上传文件对象
    //             onProgress: function(progressData) {
    //                 console.log(JSON.stringify(progressData));
    //             }
    //         }, function(err, data) {
    //             console.log(err || data);
    //         });
    //     }
    // });

    function getUrlByKey(key) {
        var url = cos.getObjectUrl({
            Bucket: bucket,
            Region: region,
            Key: key,
            Sign: false
        });
        return url;
    }

    function load() {
        console.log("---被加载");
        var contents = null;
        
        cos.getBucket({
            Bucket: bucket, /* 必须 */
            Region: region,     /* 存储桶所在地域，必须字段 */
            Prefix: 'cartoon/',           /* 非必须 */

         }, function(err, data) {
            // console.log(err || data.Contents);
            contents = data.Contents;
            if (contents != null) {
                for (var i = 0; i < contents.length; i++) {
                    if (contents[i].Size != 0) {
                        var key = contents[i].Key;
                        var url = getUrlByKey(key);
                        imgUrls.push(url);
                    }
                }
                for (var i = imgUrls.length - 1; i >= 0; i--) {
                    // 按照justified-gallery规定的一种格式创建html标签
                    var lable_a = $("<a></a>");
                    $(lable_a).attr("class", "gallery-item jg-entry entry-visible"); // 增加图片翻页功能
                    $(lable_a).attr("href", imgUrls[i]);
                    var lable_img = $("<img>");
                    $(lable_img).attr("src", imgUrls[i]);
                    $(lable_img).attr("alt", i + 1);
                    $(lable_a).append($(lable_img));
                    $("#my-gallery").append($(lable_a));
                }
            }
         });
    }

    load();
});