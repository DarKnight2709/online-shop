//Fetch if User logged in or not
export const fetchSession = async () => {
    try{
        const res = await fetch('http://localhost:5000/api/auth/session', {
            method: 'GET',
            credentials: 'include'
        });
        if (res.ok) {
            const jsonResponse = await res.json();
            console.log(jsonResponse);
            return jsonResponse.user;
        } else {
            return null;
        }
    } catch (err) {
        alert('error');
  }
}




//User Logout
// export const logout = async () => {
//     try{
//         const res = await fetch('/api/logout/', {
//             method : 'DELETE', 
//             credentials: 'include'          
//         });
//         if (res.ok) {            
//             return true;
//         } else {
//             return false;
//         }
//     }catch(e) {
//         console.log(e);
//     }
// }

export const logout = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/logout", {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {            
            return true;
        } else {
            return false;
        }
    } catch (error) {
      console.error(error.message);
    }
}


//Update Cart item
export const updateCart = async (productid, quantity) => {
    try {
        const res = await fetch('http://localhost:5000/api/cart/', {
            method : 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },    
            body: JSON.stringify({productid, quantity})            
        });
    
        if(res.ok) {
            return true;
        } else {
            return false;
        }
    } catch(e) {
        alert(e);
    }    
}

//Delete item in cart
export const deleteItemCart = async(productid) => {
    try {
        const res = await fetch('http://localhost:5000/api/cart/', {
            method : 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },    
            body: JSON.stringify({productid})            
        });
    
        if(res.ok) {
            return true;
        } else {
            return false;
        }
    } catch(e) {
        alert(e);
    }
}

//Empty Cart
export const emptyCart = async() => {
    try {
        const res = await fetch('http://localhost:5000/api/cart/empty/', {
            method : 'DELETE',
            credentials: 'include'            
        });
    
        if(res.ok) {
            return true;
        } else {
            return false;
        }
    } catch(e) {
        alert(e);
    }
}





export const fetchCategoriesWithBrands = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/brand/');
        const data = await response.json();
        return data;
    } catch (err) {
        console.error('Failed to fetch category menu:', err);
    }
};




//update user info
export const updateUser = async ({userId, email , username, phone, address}) => {
    try {
        const res = await fetch(`http://localhost:5000/api/user/${userId}`, {
            method : 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },    
            body: JSON.stringify({username, email, phone, address})            
        });
    
        if(res.ok) {
            return true;
        } else {
            return false;
        }
    } catch(e) {
        alert(e);
    }
}

//Update user Address
export const updateAddress = async (userId, addressId, addressObj) => {
    try {
        const res = await fetch(`http://localhost:5000/api/user/${userId}/address/${addressId}`, {
            method : 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },    
            body: JSON.stringify(addressObj)            
        });    
        if(res.ok) {
            return true;
        } else {
            return false;
        }
    } catch(e) {
        alert(e);
    }    
}

///Add New Address
export const addNewAddress = async (userId, addressObj) => {
    try {
        const res = await fetch(`http://localhost:5000/api/user/${userId}/address`, {
            method : 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },    
            body: JSON.stringify(addressObj)            
        });
    
        if(res.ok) {
            return true;
        } else {
            return false;
        }
    } catch(e) {
        alert(e);
    }    
}

//Delete Address
export const deleteAddress = async (userId, addressId) => {
    try {
        const res = await fetch(`http://localhost:5000/api/user/${userId}/address/${addressId}`, {
            method : 'DELETE',
            credentials: 'include',            
        });
    
        if(res.ok) {
            return true;
        } else {
            return false;
        }
    } catch(e) {
        alert(e);
    }
}


//Create New Order
export const createNewOrder = async (orderObj) => {
    try{
        const res = await fetch('http://localhost:5000/api/cart/create-order', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
    
            body: JSON.stringify(orderObj)
        });
        
        if(res.ok) {
            const jsonResponse = await res.json();
            return jsonResponse;
        } else {            
            return null;
        }
    }catch(e) {
        return null;
    }
}



//Update Order Status in server, when payment failed
export const updateFailOrder = async (orderId) => {
    const res = await fetch('http://localhost:5000/api/payments-checkout/failed-stripe', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({orderId})
    });
    
    if(res.ok) {            
        return true;
    } else {
        
        return false;
    }
}


