## General information ##
  * Getting downloading/streaming to work is still a work in progress.  I welcome all feedback on the process as I still work out the kinks.  [webmyth.help@gmail.com](mailto:webmyth.help@gmail.com)
  * Downloading seems to work a lot better than streaming for some reason, so I recommend downloading to the device.
  * When downloading the phone becomes very slow and somewhat unusable.  It is best to start the download and let the download complete before trying to use your phone again.
  * The downloaded videos will show up in the "videos" app and the filename is the name of the recording.
  * Currently streaming does not work if your mythweb is password protected.  Hopefully this will be fixed in a future release.  (You can setup your web server no not need a password just for your phone's IP address if you want).

## Transcoding recordings ##
  * Basically you need to make a H.264 recording for each recording you want to download and the filename needs to be the same base filename as the original recording but with an .mp4 extension.  e.g. a recording with an original filename of '3691\_20101015022700.mpg' would need to have a transcoded filename of '3691\_20101015022700.mp4'
  * I wrote a small script to use the [HandBrake](http://handbrake.fr/) conversion program to create the files with the correct file extension.  You can get the script in the [download](http://code.google.com/p/webmyth2/downloads/list) section on this website.
  * You will want to setup on of MythTV's user jobs to run the program that generates the transcoded recording.  It may vary depending on your script, but on my setup I have the user job command as _'/usr/local/bin/mythHandbrake "%DIR%" "%FILE%"'_

## Removing old transcoded files ##
  * After you delete a recording it would make sense to delete the transcoded files as well.
  * You can get the cleanup script I wrote in the [download](http://code.google.com/p/webmyth2/downloads/list) section on this website and then setup a cron job to run it regularly.