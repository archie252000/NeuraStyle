import React, {useState, Fragment} from 'react'
import DragDropBox from './DragDropBox';

import axios from 'axios';


export const GetImages: React.FC = () => {
   
    const [styleImage, setStyleImage] = useState<File>(new File([''],'dummy.txt'));
    const [contentImage, setContentImage] = useState<File>(new File([''],'dummy.txt'));
    const [transferImagePath, updateTransferImagePath] = useState<string>('');
    const [loading, updateLoading] = useState<boolean> (false);

    const PropsContent = {image_type:'Content', style_fun: setStyleImage, content_fun: setContentImage};
    const [flag, updateFlag] = useState<boolean> (true);   
    
    
    const PropsStyle = {image_type:'Style', 
     style_fun: setStyleImage,
     content_fun: setContentImage};
    const transfer = () => {
        const formData: FormData = new FormData();
        updateFlag(false);
        updateLoading(true);
        
        formData.append('styleImage', styleImage);
        formData.append('contentImage', contentImage);

        const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };

    
            
            axios.post('/get_transfer_image', formData, config).then
            (res => {
            const bytestring: string = res.data['status'];
            let image: string = bytestring.split('\'')[1]
            image =  'data:image/jpeg;base64,'+image
            updateLoading(false);
            updateTransferImagePath(image)
           }).catch(err => console.log(err))

            

               

         

         
  
        }
    
    return (
    <Fragment>
    {flag?
        (<div className = "GetImages">
        <div className = "images-box">
            <DragDropBox {...PropsContent}/>
            <DragDropBox {...PropsStyle} />
        </div>
        <div className="tr-bt"><button type="button" className="btn btn-primary transfer-button" onClick = {transfer}>TRANSFER</button></div>
    </div>):(<div className='TransferPage'>
           <div className="transferimage">
               <h2 className='transfer-heading'>Image with changed style</h2>
               
               
             { loading?(<div className = 'loadScreen'>
                             <div className = "Spinner"><div className="spinner-grow" role="status"></div></div>
                             <div className="lead center-text">Processing Image</div>
                             <div className="lead center-text">This might take some time</div>
                         </div>):(<Fragment></Fragment>)
             }
           
            <img id='imgPrime' src={transferImagePath} height='300px' width='auto'  />
           </div>
        </div>)
    }
    </Fragment>
    )
    
}
