import { Avatar, Button, InputLabel, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {  useNavigate, useParams } from 'react-router-dom'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { pink } from "@mui/material/colors";
import TextareaAutosize from '@mui/material/TextareaAutosize';

const rx_live = /^[+-]?\d*(?:[,]\d*)?$/;

const EditShoes = () => {
    const[shoes, setShoes] = useState(null);
    const [ImageUrl, setImageUrl] = useState('');
    const [Name, setName] = useState('');
    const [Category, setCategory] = useState('');
    const [Description, setDescription] = useState('');
    const [Price, setPrice] = useState('');
    const [NameError, setNameError] = useState(false);
    const [CategoryError, setCategoryError] = useState(false);
    const [DescriptionError, setDescriptionError] = useState(false);
    const [PriceError, setPriceError] = useState(false);

    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async() => {
        const data = await fetch('http://localhost:3000/Shoes/edit/' + id);
        const shoes = await data.json();
        setShoes(shoes);
        setImageUrl(shoes.imageUrl);
        setName(shoes.name);
        setCategory(shoes.category);
        setDescription(shoes.description);
        setPrice(shoes.price);
    }

    const editShoes = (e) => {
        e.preventDefault();

        setNameError(false);
        setCategoryError(false);
        setDescriptionError(false);
        setPriceError(false);

        const url = 'http://localhost:3000/Shoes/edit/' + id;
        fetch(url, {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                ImageUrl: ImageUrl,
                Name: Name,
                Category: Category,
                Description: Description,
                Price: Price
            })
        })
        .then(() => {
            if(Name === ""){
                setNameError(true);
            }
            else if(Category === ""){
                setCategoryError(true);
            }
            else if(Description === ""){
                setDescriptionError(true)
            } else {
            navigate('/');
        }
        })
    }

    const checkAndSetPrice = (e) => {
        if (rx_live.test(e)) {
            setPrice(e);
        }
    }

    return ( 
        <div className="addShoes">
            <Avatar className="avatar" sx={{ bgcolor: pink[300] }}>
                < ModeEditOutlineOutlinedIcon />
            </Avatar>
             <Typography variant="h5" gutterBottom component="div" mb={ 3 }>
                Edit shoes
            </Typography>
            { shoes && <div className="forma"> 
                <form onSubmit={editShoes}>
                    <InputLabel className="label">
                        Enter the image url
                    </InputLabel>
                    <TextField fullWidth type="url" id="outlined-input" color="success" label="Image url" 
                    placeholder="https://www.societaallestero.com/wp-content/themes/consultix/images/no-image-found-360x250.png"
                    autoComplete="off" value={ImageUrl} onChange={(e) => setImageUrl(e.target.value)}/>
                    <br/>
                    <InputLabel className="label">
                        Enter the name of the shoes
                    </InputLabel>
                    <TextField fullWidth required id="outlined-required" color="success" label="Name" autoComplete="off"
                    value={Name} onChange={(e) => setName(e.target.value)} error={NameError}/> 
                    <br/>
                    <InputLabel className="label">
                        Enter category
                    </InputLabel>
                    <TextField fullWidth required id="outlined-required" color="success" label="Category" autoComplete="off"
                    value={Category} onChange={(e) => setCategory(e.target.value)} error={CategoryError}/>
                    <br/>
                    <InputLabel className="label">
                        Enter the description
                    </InputLabel>
                    <TextareaAutosize className="textarea" required label="Description" value={Description} 
                    onChange={(e) => setDescription(e.target.value)} error={DescriptionError} aria-label="minimum height" 
                    minRows={5} maxRows={8} style={{ width: 450 }}/>
                    <br/>
                    <InputLabel className="label">
                        Enter the price
                    </InputLabel>
                    <TextField fullWidth required id="outlined-required" color="success" label="Price" helperText="The currency is KM" 
                    autoComplete="off" value={Price} onChange={(e) => checkAndSetPrice(e.target.value)} error={PriceError}
                    pattern="[+-]?\d+(?:[.,]\d+)?"/>
                    <br/>
                    <Button type="submit" variant="contained" color="success" className="submit">SAVE</Button>
                </form>
            </div> }
        </div>
     );
}
 
export default EditShoes;