<#include "../wrap/common.ftl">
<#assign pageName='架构管理' />
<#escape x as x?html>
<!DOCTYPE html>
<html>
<head>
    <@meta/>
    <@title text="架构管理"/>
    <@css/>
<#-- 页内样式 -->
    <style type="text/css">
        .g-mn1c .searchbar{margin-bottom: 25px;}
        .g-mn1c .searchbar label{margin-left: 30px;font-size: 14px;}
        .g-mn1c .pageselect{float: left;margin-top: 30px;}
        .g-mn1c .f-fl{float: left;}
        .g-mn1c .f-fr{float: right;}
        .fmitm{margin-top: 10px;}
        .fmitm p{display: inline-block;line-height:150%}
        .fmitm p>span{display: inline-block;margin: 5px;}
        .fmitm label{vertical-align: top;}
        .fmitm textarea{width: 405px;height: 100px;padding: 5px 10px;border: 1px solid #ddd;}
        .fmitm .f-vam{vertical-align: middle;}
        .fmitm .lab-1{display: inline-block;}
        .fmitm .tip{margin-left: 10px;}
        .fmitm .tip-1{display: block;margin-top: 3px;margin-left: 0; }
        .fmitm .tip-2{color: red;margin-top: 7px;}
        .fmitm .u-ipt-1{width: 280px;}
        .fmitm .u-ipt-2{width: 253px;}
        .fmitm .u-ipt-3{width: 40px;min-width: 40px;}
        .fmitm .u-btn-1{background-color: #888;}
        .fmitm .disnone{display: none;}
        .m-pager{float: right;margin-top: 30px;}
        .clear{clear:both;}
        .Content-Left{
            width:20%;
            max-height:745px;
            border:1px solid #ddd;
            margin-right:10px;/*设置元素跟其他元素的距离为20像素*/
            float:left;/*设置浮动，实现多列效果，div+Css布局中很重要的*/
            overflow-y:auto;
        }
        .Content-List{
            width:75%;
            float:left;/*设置浮动，实现多列效果，div+Css布局中很重要的*/

        }
        .b{
            margin: 20px 20px;
            padding: 20px 20px;
            border: 4px dashed #a4bfea;
            border-radius: 10px;
            background-color: #dde5f7;
            width:1100px;
        }
        .val{
            max-width: 850px;
            margin-left: 5px;
        }
        .comment{
            padding: 10px 4px;
            border: 1px dashed #ccc;
            margin: 0px 0px 10px 20px;
            border-radius: 5px;
            line-height: 100%;
            word-wrap: break-word;
        }
        .req-describe{
            padding: 10px 4px;
            border: 1px dashed #ccc;
            margin: 5px 0px 5px 0px;
            border-radius: 5px;
            line-height: 18px;
            word-wrap: break-word;
        }
        #detail-comment{
            display: none;
            /* margin-top: 10px; */
            font-weight: bold;
            /* width: 900px; */
            /* margin: auto; */
            border: 1px dashed #ccc;
            padding: 20px;
            border-radius: 5px;
        }
        #detail-flow-label{
            display: none;
            /* margin-top: 10px; */
            font-weight: bold;
            /* width: 900px; */
            /* margin: auto; */
            border: 1px dashed #ccc;
            padding: 20px;
            border-radius: 5px;
        }
    </style>
</head>
<body id="index-netease-com">
    <@nav/>
<div class="g-bd f-cb">
    <div class="g-sd">
        <@menu />
    </div>
    <div class="g-mn1">
        <div class="g-mn1c">

        </div>
        <@bottom/>
    </div>
</div>
<!-- @DEFINE -->
<script src="${jslib}define.js?pro=${jspro}"></script>
<script src="${jspro}pro/page/authorizeManage.js"></script>
<script src="${jspro}laydate/laydate.js"></script>
</body>
</html>
</#escape>
