from flask import Flask, request, jsonify
from datetime import datetime
from pymongo import MongoClient
import random
import string

app = Flask(__name__)

# MongoDB connection (update with your details)
client = MongoClient('mongodb://localhost:27017/')
db = client['exaquiz']

def generate_user_id():
    return ''.join(random.choices(string.ascii_letters + string.digits, k=12))

def generate_referral_code():
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json
    phone = data.get('phone')
    name = data.get('name')
    gender = data.get('gender')
    referral_code = data.get('referralCode')
    if not phone or not name or not gender:
        return jsonify({'success': False, 'message': 'Missing fields'}), 400
    coin = 0
    if referral_code:
        referrer = db.users.find_one({'my_referral_code': referral_code})
        if referrer:
            db.users.update_one({'_id': referrer['_id']}, {'$inc': {'coin': 5}})
        else:
            return jsonify({'success': False, 'message': 'Invalid referral code'}), 400
    user_id = generate_user_id()
    my_referral_code = generate_referral_code()
    db.users.insert_one({
        '_id': user_id,
        'phone': phone,
        'name': name,
        'gender': gender,
        'coin': coin,
        'my_referral_code': my_referral_code,
        'referred_by': referral_code or None,
        'created_at': datetime.utcnow()
    })
    return jsonify({'success': True})

if __name__ == '__main__':
    app.run(debug=True)