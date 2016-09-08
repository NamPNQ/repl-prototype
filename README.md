Repl prototype
==============


## Get repl token
```python
import hmac
import hashlib
import time
def get_repl_token():
    time_created = int(round(time.time()*1000))
    return {'msg_mac': hmac.new('secret', str(time_created), hashlib.sha256).digest().encode('base64').strip(), 'time_created': time_created}

```
