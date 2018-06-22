import {Modal} from 'antd';
import * as React from 'react';

interface PicModal{
   link:string
   onCancel(item:string,value:boolean):void
}
const PicModal:React.SFC<PicModal> = (props) => {

   return( <div>
        <Modal
            maskClosable={true}
            style={{ top: '5vh', textAlign:'center' }}
            width={'90%'}
            bodyStyle={{height:"80vh" }}
            title={'Hello'}
            visible={true}
            onCancel={()=>{props.onCancel('showProduct',false)}}
            okText={'confirm'}
            footer={
                [null]
            }
        >
            <img src={props.link} alt={'pic missing'} style={{height:"100%"}}/>


            
        </Modal>

    </div>)
}

export default PicModal;