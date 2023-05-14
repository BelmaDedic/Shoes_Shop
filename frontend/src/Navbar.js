import Avatar from '@mui/material/Avatar';
import { Link} from 'react-router-dom';

const NavbarHome = () => {

    return ( 
        <div className="navbar">
            <Link to="/">
            <Avatar alt="Logo" sx={{ height: 82, width: 82 }} src="https://images-platform.99static.com//zvgtch1g-AfvYKsLleHclChDLYE=/222x209:1707x1694/fit-in/500x500/projects-files/101/10165/1016553/09deac31-4bdc-4bb6-b6f2-e644b4ff0500.png" />
            </Link>
            <div className='links'>
                <Link to="/" className='link'>Home</Link>
                <Link to="/Shoes/new" className='link'>Add Shoes</Link>
            </div>
        </div>
     );
}
 
export default NavbarHome;