import { useEffect, useState } from 'react'
import './Profile.css'
import { useForm, SubmitHandler } from "react-hook-form"
import { ownersApi } from '../../apis/endpoints'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

type Inputs = {
    accountNumber: string,
    bankCode: string,
    zelleId: string,
    user: {
        firstName: string,
        lastName: string,
        emailId: string,
        mobileNumber: string,
        createdDate: string,
        modifiedDate: string,
        createdBy: string,
        modifiedBy: string,
        login: boolean,
        loginCounts: number
    },
}


export default function Profile() {

    const [editButton, setEditButton] = useState<boolean>(true);
    const [inputEditable, setInputEditable] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [profileData, setProfileData] = useState<Inputs>();

    const [errorUpdate, setErrorUpdate] = useState<string>('');
    const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);

    useEffect(() => {
        fetchCustomer();
    }, [])

    const userId: any = localStorage.getItem('userHashId');

    const {
        register,
        handleSubmit,
        // watch,
        reset,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setLoadingUpdate(true)
        try {
            const response = await fetch(ownersApi.fetchById, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'id': userId,
                    'Authorization' :`Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(data)
            });
            const updatedResponse: any = await response.json();
            if (response.ok) {
                toast.success('Details updated successfully');
                setEditButton(true)
            }
            else {
                console.log(updatedResponse);
                toast.error('Update failed. Please try again.');
            }
        }
        catch (error) {
            console.log(error);
            toast.error("SOMETHING WENT WRONG")
        }
        finally {
            setLoading(false)
        }
    };

    const fetchCustomer = async () => {
        setLoading(true);
        try {

            const response = await fetch(ownersApi.fetchById, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'id': userId,
                    'Authorization' :`Bearer ${localStorage.getItem('token')}`
                },

            });
            const data: any = await response.json();
            setProfileData(data)
            reset(data)
        }
        catch (error) {
            toast.error('An error occurred. Please try again later.');
            console.log(error);
        } finally {
            setLoading(false)
        }
    }


    // console.log(watch("accountNumber")) // watch input value by passing the name of it

    const { t } = useTranslation('labels')

    return (
        <div className='profile'>
            <div className='profileEditButton'>
                <button onClick={() => setEditButton(!editButton)}>{t('label.edit')}</button>
            </div>
            {/* "handleSubmit" will validate your inputs before invoking "onSubmit"  */}
            <div className='form'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Field open */}
                    <label>{t('label.firstName')}</label>
                    <input defaultValue={profileData?.user?.firstName} disabled={editButton}  {...register("user.firstName", { minLength: 1 })} />
                    {errors?.user?.firstName?.type === "required" && <p>This field is required</p>}
                    {errors?.user?.firstName?.type === "minLength" && <p>First name cannot be empty</p>}
                    {/* {errors?.user?.firstName?.type === "pattern" && <p>Alphabetical characters only</p>} */}

                    <label>{t('label.accountNo')}</label>
                    <input defaultValue={profileData?.accountNumber} disabled={editButton}  {...register("accountNumber")} />

                    <label>{t('label.emailId')}</label>
                    <input defaultValue={profileData?.user?.emailId} disabled={editButton}  {...register("user.emailId")} />

                    <label>{t('label.lastName')}</label>
                    <input defaultValue={profileData?.user?.lastName} disabled={editButton}  {...register("user.lastName")} />

                    <label>{t('label.bankCode')}</label>
                    <input defaultValue={profileData?.bankCode} disabled={editButton} {...register("bankCode")} />

                    <label>{t('label.mobileNumber')}</label>
                    <input defaultValue={profileData?.user?.mobileNumber} disabled={editButton} {...register("user.mobileNumber")} />

                    <button disabled={editButton} type="submit">{t('label.update')}</button>
                </form>
            </div>
        </div>
    )
}
