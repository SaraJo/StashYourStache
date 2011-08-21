/* Copyright (c) 2008 DIYism (email/msn/gtalk:kexianbin@diyism.com web:http://diyism.com)
 * Licensed under GPL (http://www.opensource.org/licenses/gpl-license.php) license.
 * project site: http://plugins.jquery.com/project/ajax_postup
 * Version: k9bq
 */

$.ajax_postup=function(obj)
              {//obj=={url:, file_ele_ids:, data:, success:}
               if ($('#div_form_jump').length>0)
                  {var the_div=$('#div_form_jump')[0];
                   the_div.innerHTML='';
                  }
               else
                   {var the_div = document.createElement('div');
                    the_div.id='div_form_jump';
                    the_div.style.display='none';
                   }
               var inner_html = '<form enctype="multipart/form-data" action="'+obj.url+'" method="post" target="iframe_upload" name="form_jump">';
               for (var key in obj.data)
                   {if (typeof(obj.data[key])!='object')
                       {inner_html+='<input type="text" name="'+key.replace(/"/g, '&quot;')+'" value="'+obj.data[key].replace(/"/g, '&quot;')+'" />';
                       }
                    else
                        {for (var key1 in obj.data[key])
                             {inner_html+='<input type="text" name="'+key.replace(/"/g, '&quot;')+'" value="'+obj.data[key][key1].replace(/"/g, '&quot;')+'" />';
                             }
                        }
                   }
               inner_html += '</form>';
               inner_html += '<iframe style="display: none;" name="iframe_upload" id="iframe_upload" src="" onload="upload_iframe_onload()"></iframe>';
               the_div.innerHTML = inner_html;
               document.body.appendChild(the_div);
               for (var i=0;i<obj.file_ele_ids.length;++i)
                   {var the_id=obj.file_ele_ids[i];
                    $('#'+the_id).wrap('<div id="file_ele_wrap"></div>');
                    var the_outer_html=$('#file_ele_wrap')[0].innerHTML;
                    $(document.form_jump).append($('#'+the_id));//won't work in IE if using ".clone()"
                    $('#'+the_id).attr('name', the_id);
                    $('#file_ele_wrap').replaceWith($(the_outer_html));
                   }
               window.upload_iframe_onload=function()
                                           {var ifr=document.getElementById('iframe_upload');
                                            if (ifr.contentWindow)
                                               {var json=ifr.contentWindow.document.body?ifr.contentWindow.document.body.innerHTML:null;
                                               }
                                            else if (ifr.contentDocument)
                                                 {var json=ifr.contentDocument.document.body?ifr.contentDocument.document.body.innerHTML:null;
                                                 }
                                            obj.success(json)
                                           };
               document.form_jump.submit();
              }