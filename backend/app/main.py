from flask import Flask, jsonify, request
from flask_cors import CORS
from os import getenv
from .services import get_products, login

ODOO_URL = getenv("ODOO_URL", "")
ODOO_USER = getenv("ODOO_USER", "")
ODOO_PASSWORD = getenv("ODOO_PASSWORD", "")
ODOO_DB = getenv("DATABASE", "")

app = Flask(__name__)
CORS(app)

@app.post('/auth')
def auth():
    body = request.get_json()["data"]
    try:
        username = body["username"]
        password = body["password"]

        print(f"{username} {password}")

        id, user, passwd = login(username, password)

        return jsonify({ "id": id, "username": user, "password": passwd }), 200
    except:
        return jsonify({
            "status": "500",
            "body": body 
        }), 500
    
@app.get('/products')
def products():
    pricelist_id = request.args.get('pricelist_id')
    return jsonify({"status": "ok", "products": get_products(pricelist_id)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)