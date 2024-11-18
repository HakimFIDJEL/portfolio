import Layout from "@/Layouts/minimalist"
import { Link } from "@inertiajs/react"

import BigButton from "@/Components/minimalist/BigButton"
import { Block } from "@/Components/minimalist/Block"

import { 
    Badge,
    BadgeWrapper,
    BadgeContainer
} from "@/Components/minimalist/Badge"

import {
    Timeline,
    TimelineItem
} from "@/Components/minimalist/Timeline"


function Project({}) {
    return <>

        <section id="hero" className="row flex-column">
            <div className="container row justify-content-between gap-md">
                <span className="title row flex-column gap-xs">
                    <h1>Project</h1>
                    <p>Project description</p>
                </span>
                <span className="links d-flex align-items-center gap-xs">
                    <Link
                        title="Source code"
                        href="#"
                        className="hover__effect"
                    >
                        <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23.25 8L18 13.25L16.9425 12.1925L21.1275 8L16.9425 3.8075L18 2.75L23.25 8ZM0.75 8L6 2.75L7.0575 3.8075L2.8725 8L7.0575 12.1925L6 13.25L0.75 8ZM9.315 15.113L13.23 0.5L14.679 0.88775L10.764 15.5L9.315 15.113Z" fill="#C9D1D9"/>
                        </svg>
                    </Link>
                    <Link
                        title="See project"
                        href="#"
                        className="hover__effect disabled"
                    >
                        <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.75 0.5H10.75M10.75 0.5V10.5M10.75 0.5L0.75 10.5" stroke="#C9D1D9" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </Link>
                </span>
            </div>
            <hr />
            <div className="footer row justify-content-between gap-xs">
                <BadgeContainer title="Tech stack">
                    <BadgeWrapper>
                        <Badge>React</Badge>
                        <Badge>PHP</Badge>
                        <Badge>MySQL</Badge>
                    </BadgeWrapper>
                </BadgeContainer>
                <BadgeContainer title="Date">
                    <BadgeWrapper>
                        <Badge>18 Oct. 2024</Badge>
                    </BadgeWrapper>
                </BadgeContainer>
            </div>
        </section>

        <section id="infos">

            <div className="row gap-xs align-items-start justify-content-between">
                <Block
                    title="📝 Description"
                    collapsable={true}
                    className="col-7"
                >
                    Chaque rêve commence par une vision, un idéal que l’on souhaite atteindre, que l’on entrevoit parfois vaguement, comme un phare lointain dans la brume. Au départ, l’enthousiasme est puissant, presque inébranlable. Les premières étapes semblent légères, portées par une énergie nouvelle, celle de l’excitation et de l’envie. C’est souvent à ce moment-là que tout paraît possible, que chaque obstacle semble surmontable. Le cœur bat vite, les idées fusent, et l’envie de réussir brûle comme une flamme vive.
                    Mais alors que l’on avance, la route se fait sinueuse. L’enthousiasme initial s’essouffle, et la réalité s’impose avec sa part de difficultés. 

                    L’obstacle inattendu surgit, l’échec fait surface, et l’incertitude s’immisce. C’est ici que le véritable voyage commence, car la persévérance naît rarement dans le confort. Elle se forge dans la résistance, dans l’acte de se relever après chaque chute, même lorsque les forces semblent manquer.

                    La persévérance, c’est cette capacité à continuer malgré les doutes, à avancer malgré les échecs et à croire en soi lorsque tout paraît flou. Elle nous pousse à affronter nos peurs, à regarder l’inconnu en face et à avancer malgré tout. Elle nous rappelle que chaque difficulté surmontée est une victoire, que chaque échec est une leçon, et que la somme de ces expériences finit par nous renforcer. C’est ce chemin pavé d’erreurs, de succès et d’épreuves qui forge le caractère, qui révèle les vraies forces, celles que l’on ignore souvent posséder.
                </Block>


                <Block
                    title="⏳ Timeline"
                    collapsable={true}
                    className="col-5"
                >

                    <div className="row flex-column gap-md">
                        <Timeline>
                            <TimelineItem
                                label="Project start"
                                date="18 Oct. 2024"
                                duration="1 day"
                            />
                            <TimelineItem
                                label="Design"
                                date="19 Oct. 2024"
                                duration="3 days"
                            />
                            <TimelineItem
                                label="Development"
                                date="22 Oct. 2024"
                                duration="7 days"
                            />
                            <TimelineItem
                                label="Testing"
                                date="29 Oct. 2024"
                                duration="2 days"
                            />
                            <TimelineItem
                                label="Deployment"
                                date="31 Oct. 2024"
                                duration="1 day"
                            />
                        </Timeline>

                        <Link
                            href="#"
                            className="col-12 hover__effect"
                            id="see-full-timeline"
                            target="_blank"
                        >
                            See full timeline
                        </Link>
                    </div>


                    
                </Block>

            </div>
        </section>

        {/* <section id="images">

        </section> */}

        <section id="feedback">
            <Block
                title="💬 Feedback"
                collapsable={true}
                className="col-12"
            >
                Chaque rêve commence par une vision, un idéal que l’on souhaite atteindre, que l’on entrevoit parfois vaguement, comme un phare lointain dans la brume. Au départ, l’enthousiasme est puissant, presque inébranlable. Les premières étapes semblent légères, portées par une énergie nouvelle, celle de l’excitation et de l’envie. C’est souvent à ce moment-là que tout paraît possible, que chaque obstacle semble surmontable. Le cœur bat vite, les idées fusent, et l’envie de réussir brûle comme une flamme vive.
                Mais alors que l’on avance, la route se fait sinueuse. L’enthousiasme initial s’essouffle, et la réalité s’impose avec sa part de difficultés. 

                L’obstacle inattendu surgit, l’échec fait surface, et l’incertitude s’immisce. C’est ici que le véritable voyage commence, car la persévérance naît rarement dans le confort. Elle se forge dans la résistance, dans l’acte de se relever après chaque chute, même lorsque les forces semblent manquer.

                La persévérance, c’est cette capacité à continuer malgré les doutes, à avancer malgré les échecs et à croire en soi lorsque tout paraît flou. Elle nous pousse à affronter nos peurs, à regarder l’inconnu en face et à avancer malgré tout. Elle nous rappelle que chaque difficulté surmontée est une victoire, que chaque échec est une leçon, et que la somme de ces expériences finit par nous renforcer. C’est ce chemin pavé d’erreurs, de succès et d’épreuves qui forge le caractère, qui révèle les vraies forces, celles que l’on ignore souvent posséder.
            </Block>
        </section>

        <section id="actions" className="row align-items-center justify-content-between gap-xs">
            <BigButton
                link="#"
                className="d-flex align-items-center justify-content-between"
            >
                <div className="row align-items-center gap-sm">
                    <span>
                        See next project
                    </span>
                </div>
                <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.062477 6L12.2958 6L7.05297 0.75L7.71207 0L14.2032 6.5L7.71207 13L7.05297 12.25L12.2958 7L0.062477 7V6Z" fill="#CECECE"/>
                </svg>
            </BigButton>
        </section>


    </>
}


Project.layout = page => <Layout 
                            children={page} 
                            page="project" 
                            isOnHome={false}
                        />

export default Project