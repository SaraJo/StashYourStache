<?php // process.php
ob_start();
 /* Get Form Data */
$file = $_FILES["file"]["tmp_name"];
$file_name = $_FILES["file"]["name"];

 /* Domain Check Function */
function domain_check($url) {
 $agent = "Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0)";
 $ch = curl_init();
 curl_setopt ($ch, CURLOPT_URL, $url);
 curl_setopt($ch, CURLOPT_USERAGENT, $agent);
 curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
 curl_setopt ($ch,CURLOPT_VERBOSE, false);
 curl_setopt($ch, CURLOPT_TIMEOUT, 5);
 $page = curl_exec($ch);
 $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
 curl_close($ch);
 if ($httpcode >= 200 && $httpcode < 300) { return true; }
 else { return false; }
}

 /* Check if your upload domain is up */
if (domain_check("http://current.openphoto.me/photo/upload.json")) {
 /* Limit files types (GIF, JPG, PNG) and file size (2mb) */
  if ($_FILES["file"]["error"] > 0) {
   echo "error";
  } else {
    $ch = curl_init('http://current..me/photo/upload.json');
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt(
      $ch, 
      CURLOPT_POSTFIELDS, 
      array('photo' => "@$file", 'tags' => 'stachyourstache', returnOptions => '300x300')
    );
    $result = curl_exec($ch);
      curl_close($ch);
      ob_end_clean();
      header("Location: index.html", true, 301);
  }
} else {
 echo "error: domain not available";
}

?>
