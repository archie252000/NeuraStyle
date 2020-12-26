import React, {useState, Fragment} from 'react';
import axios from 'axios';

interface Props{
    image_type: string;
    style_fun: React.Dispatch<React.SetStateAction<File>>;
    content_fun:React.Dispatch<React.SetStateAction<File>>;
}

const DragDropBox: React.FC<Props> = ({image_type, style_fun, content_fun}) => {
    

    

    
    const [imagePath, updateImagePath] = useState<string>('');
    const [loading, updateLoading] = useState<boolean> (false);
    
    

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateLoading(true)
        if(e.target.files && e.target.files[0]){
            
           
            const formData: FormData = new FormData();
            formData.append(image_type, e.target.files[0]);
            let image = ''

            // const config = {
            //     headers: {
            //         'Content-Type': 'multipart/form-data'
            //     }
            // };
          
            
            if(image_type === 'Content'){
             content_fun(e.target.files[0]);
           
            }

            if(image_type === 'Style'){
             style_fun(e.target.files[0])
            //  const res = await axios.post('/upload_style_image', formData, config);
            }

            
            updateLoading(false)
            const url = window.URL.createObjectURL(e.target.files[0])
            updateImagePath(url)
             
        
        }
    
    
    };
    
    return (
        <div className='drag-drop-box'>
        
            <h3>Upload {image_type} Image</h3>

            <input type = 'file' name ={image_type +"file"} id={image_type +"file"} className="inputfile" onChange = {e => onChange(e)} />
            
             {loading ? (<div className="spinner-grow" role="status">
                          <span className="sr-only">Loading...</span>
                          </div>):(<Fragment></Fragment>)}
            
            <img id='imgPrime' src={imagePath} height= '300px' width='auto'  />

            <label htmlFor ={image_type +"file"} className="btn btn-primary bg-primary"><i className="fa fa-upload" aria-hidden="true"></i> UPLOAD FILE</label>

        </div> 
    )
}

export default DragDropBox;