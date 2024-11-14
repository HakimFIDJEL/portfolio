export default function Section({title, subtitle, id, children}) {
    return <>
        <section 
            className="section"
            id={id}
        >
            <div className="title">
                <h2>
                    {title}
                </h2>
                <p>
                    {subtitle}
                </p>
            </div>
            <hr />
            <div className="content">
                {children}
            </div>
        </section>
    </>
}