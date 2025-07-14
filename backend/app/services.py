from os import getenv
from xmlrpc.client import ServerProxy, ResponseError, ProtocolError

ODOO_URL = getenv("ODOO_URL", "")
ODOO_USER = getenv("ODOO_USER", "")
ODOO_PASSWORD = getenv("ODOO_PASSWORD", "")
ODOO_DB = getenv("ODOO_DB", "")

def authenticate():
    try:
        common = ServerProxy(f"{ODOO_URL}/xmlrpc/2/common")
        return common.authenticate(ODOO_DB, ODOO_USER, ODOO_PASSWORD, {})
    except ResponseError:
        print("Failed to obtain response")
    except ProtocolError:
        print("Wrong protocol")

def login(username, password):
    try:
        common = ServerProxy(f"{ODOO_URL}/xmlrpc/2/common")
        return common.authenticate(ODOO_DB, username, password, {}), username, password
    except ResponseError:
        print("Failed to obtain response")
    except ProtocolError:
        print("Wrong protocol")

def get_products():
    uid = authenticate()
    model = ServerProxy(f"{ODOO_URL}/xmlrpc/2/object")
    result = model.execute_kw(
        ODOO_DB,
        uid,
        ODOO_PASSWORD,
        'product.product',
        'search_read',
        [], {
        'fields': ['id', 'name', 'list_price', 'description_sale', 'categ_id', 'image_1920'],
        'limit': 2000
    })
    return [{
        'id': item['id'],
        'title': item['name'],
        'price': item['list_price'],
        'description': item['description_sale'],
        'category': item['categ_id'][1] if item['categ_id'] else None,  # Extrai o nome da categoria
        'image': f"data:image/png;base64, {item['image_1920']}" if item["image_1920"] else None,
        'rating': { 'rate': 5, 'count': 321 } 
    } for item in result]
