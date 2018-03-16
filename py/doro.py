# pylint: skip-file
print 'doro initialized ...'
import time
import RPi.GPIO as gpto

def stopwatch(seconds):
    start = time.time()
    time.clock()
    elapsed = 0
    while elapsed < seconds:
        elapsed = time.time() - start
        print 'cycle time %f - %02ds' % (time.clock() , elapsed)
        time.sleep(1)

gpto.setmode(gpto.BCM)
#ref https://www.raspberrypi-spy.co.uk/2012/06/simple-guide-to-the-rpi-gpio-header-and-pins/
gpto.setup(9, gpto.OUT)
gpto.output(9, False)

#wait 3 sec
stopwatch(3)

gpto.output(9, True)
gpto.cleanup()
