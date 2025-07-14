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

def get_products(pricelist_id):
    uid = authenticate()
    models = ServerProxy(f"{ODOO_URL}/xmlrpc/2/object")

    records = models.execute_kw(
        ODOO_DB, uid, ODOO_PASSWORD,
        'product.product', 'search_read',
        [], {
            'fields': ['id', 'name', 'list_price', 'description_sale', 'categ_id', 'image_1920'],
            'limit': 2000,
        }
    )

    products = []
    for item in records:
        base_price = item.get('list_price', 0.0)
        applied_price = base_price
        if pricelist_id:
            price_map = models.execute_kw(
                ODOO_DB, uid, ODOO_PASSWORD,
                'product.pricelist', 'get_product_price',
                [6, 1542]
            )
            # Recupera o preço para este ID, ou usa o base_price como fallback
            applied_price = price_map.get(item['id'], base_price)

        products.append({
            'id': item['id'],
            'title': item['name'],
            'price': applied_price,
            'list_price': base_price,
            'description': item.get('description_sale'),
            'category': item['categ_id'][1] if item.get('categ_id') else None,
            'image': f"data:image/png;base64,{item['image_1920']}" if item.get('image_1920') else None,
            'rating': {'rate': 5, 'count': 321},
        })

    return products

def get_company():
    uid = authenticate()
    model = ServerProxy(f"{ODOO_URL}/xmlrpc/2/object")
    result = model.execute_kw(
        ODOO_DB,
        uid,
        ODOO_PASSWORD,
        'res.company',
        'search_read',
        [], {
        'fields': ['id', 'name', 'list_price', 'description_sale', 'categ_id', 'image_1920'],
        'limit': 2000
    })


