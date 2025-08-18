import React from 'react'
import './footer.css'

function footer() {
  return (
    
        <footer>
          <div className='footer-content'>
            <div className='connect'>
            <h4>Connect with us</h4>
            <p><a href="https://facebook.com" >Facebook</a> </p>
            <p><a href="https://instagram.com"> Instagram</a> </p>
            <p><a href="https://twitter.com" > Twitter</a></p>
            </div>
            <div className='essentials'>
                <h4>Essentials</h4>
                <p><a href="/privacy" >Privacy Policy</a></p>
                <p><a href="/terms">Terms & Conditions</a></p>
                <p><a href="/contact">Contact Us</a></p>
            </div>
            </div>
            <p id='rights'>© 2025 ShopO. All Rights Reserved.</p>
            <p id='me'>Developed by Abdul Subhan</p>
        </footer>
    
  )
}

export default footer