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