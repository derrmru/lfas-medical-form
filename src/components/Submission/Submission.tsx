import { useEffect, useRef } from 'react'
import Checkbox from '../Checkbox/Checkbox'
import SignatureCanvas from 'react-signature-canvas'
import HSMC from '../../downloads/harley_street_privacy_policy.pdf'
import $ from 'jquery'
import './Submission.css'

interface Props {
    setStage: (stage: string) => void,
    setFields: (fields: any) => void,
    fields: {[index: string]: any},
    setLoading: (value: boolean) => void
}

const Submission: React.FC<Props> = ({setStage, setFields, fields, setLoading}) => {
    //scroll to top of content on initial render
    const top = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        top.current !== null && top.current.scrollIntoView({behavior: "smooth"});
      }, [])

    //functional update of fields state
    const updateField = (name: string, value: any) => {
        const temp = {...fields}
        temp[name] = value;
        setFields(temp)
    }

    //Signature canvas ref
    const sigPad = useRef<any>();

    //on form submission
    const handleSubmit = (e: any) => {
        e.preventDefault()
        if (sigPad.current._sigPad._isEmpty) {
            const doc: HTMLElement | null = (document.getElementById("signature"));
            if (doc !== null) doc.style.border = '3px solid red'
        } else {
            setLoading(true)
            //include signature in fields
            const sig = sigPad.current.getSignaturePad().toDataURL('image/png')
            const temp = {...fields};
            temp.signature = sig
            //post fields to web app
            $.post(process.env.REACT_APP_POST,
                temp,
                function(res: any, status: string) {
                    console.log(res);
                        if (status === 'success'){
                            setLoading(false)
                            setStage('completed')
                        }
                }
            );
        }
    }

    return (
        <div>
            {/*scroll to top - fake div*/}
            <div style={{ float:"left", clear: "both" }}
                ref={(el) => { top.current = el }}>
            </div>
            {/************************** */}
            <h3 style={{marginTop: '0'}}>Privacy Statement</h3>
            <p>Your Personal Data (Name, Date or Birth, Preferred Correspondence, Contact details and Medical Information and other identifying information) will be used to provide our healthcare service to you and processed in accordance with the following privacy policies:</p>
            <ul style={{textAlign: 'left'}}>
                <li><a href="http://www.londonfootandanklesurgery.co.uk/privacy-policy/" target="_blank" rel="noopener noreferrer">London Foot & Ankle Surgery - Privacy Statement</a></li>
                <li><a href={HSMC} target="_blank" rel="noopener noreferrer">Harley Street Medical Centre - Privacy Statement</a></li>
            </ul>
            <p>For more information on how we process your data contact our team who would be happy to provide further details.</p>
            <ul style={{textAlign: 'left'}}>
                <li>Tel: <a href="tel:+442078208007">+44 207 820 8007</a><br /></li>
                <li>Email: <a href="mailto: admin@londonfootandanklesurgery.co.uk">admin@londonfootandanklesurgery.co.uk</a></li>
            </ul>
            <hr className="submission-hr" />
            <form onSubmit={(e) => handleSubmit(e)}>
                <Checkbox 
                    name="privacy"
                    value={fields.privacy}
                    updateField={(name: string, value: any) => updateField(name, value)}
                    description="By checking this box you agree that you have read our privacy policy and that the personal information you provide will be processed in accordance with this."
                    required={true}
                    label="I AGREE"
                    />
                <Checkbox 
                    name="marketing"
                    value={fields.marketing}
                    updateField={(name: string, value: any) => updateField(name, value)}
                    description="We would like to send you information by email about our own products and services. If you agree to being contacted in this way, please tick the 'Yes' box below."
                    required={false}
                    label="YES"
                    />
                <hr className="submission-hr" />
                PLEASE SIGN
                <p>You can use your mouse or your finger if you have a touch screen.</p>
                <SignatureCanvas 
                    penColor='#20365F'
                    clearOnResize={false}
                    canvasProps={{id: "signature", className: 'sigCanvas', style: {width: '80%', height: 140, border: '2px solid #20365F'}}}
                    backgroundColor='rgba(255, 255, 255, 0.8)'
                    ref={(ref: any) => sigPad.current = ref}
                    />
                <button 
                    className="mf-submit-buttons"
                    style={{width: '80%'}}
                    onClick={(e) => {
                        e.preventDefault()
                        sigPad.current.clear()
                    }}>
                        clear signature
                    </button>
                <hr className="submission-hr" />
                <button
                    className="mf-submit-buttons"
                    type="submit"
                    >
                        submit
                </button>
                <button
                    className="mf-submit-buttons"
                    type="button"
                    onClick={() => setStage('medical')}
                    >
                        back
                </button>
            </form>
        </div>
    )
}

export default Submission