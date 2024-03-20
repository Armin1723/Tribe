const page = ({params}) => {
    return(
        <div className="custom-scrollbar flex justify-center w-full">
            {params.username}
        </div>
    )
}

export default page;