import Layout from "@/Layouts/minimalist"
import { Link } from "@inertiajs/react"


import Section  from "@/Components/minimalist/Section"
import Project from "@/Components/minimalist/Project"
import BigButton from "@/Components/minimalist/BigButton"

import { 
    Badge,
    BadgeWrapper,
    BadgeContainer
} from "@/Components/minimalist/Badge"

import {
    Accordeon,
    AccordeonChildren,
    AccordeonContent,
    AccordeonLabel
} from "@/Components/minimalist/Accordeon"

function Home({}) {
    return <>
        {/* Hero */}
        <section id="hero">
            <img src="" alt="" className="photo" />
            <div className="content">
                <h1>Hakim Fidjel</h1>
                <p>French apprentice engineer, fullstack engineer want to be</p>
            </div>
        </section>

        {/* About */}
        <Section
            title="👨‍🎓 About me"
            // subtitle="A little bit about me"
            id="about"
        >
            <div className="description">
                <p>
                    There is no scale for the upscaling node for model based upscaling. This means most the good models will be forcing a user to do 4x 
                </p>
                <p>
                when they may not even be able to do it under their GPU (especially if using it as part of HR-Fix like I do. Occasionally I even OOM on 4090 (weirdly by just 2mb lol).
                </p>
            </div>

            <div className="work-history">
                <h6 className="title">
                    Work History
                </h6>
                <Accordeon>
                    <AccordeonChildren>
                        <AccordeonLabel>
                            School & Diplomas
                        </AccordeonLabel>
                        <AccordeonContent>
                            <p>
                                I am a student at the University of Science and Technology Houari Boumediene, Algiers, Algeria. I am currently in the 5th year of the computer science engineering cycle. I am also a student at the National School of Computer Science (ESI) in Algiers, Algeria. I am currently in the 2nd year of the Master's cycle in Computer Science.
                            </p>
                        </AccordeonContent>
                    </AccordeonChildren>
                    <AccordeonChildren>
                        <AccordeonLabel>
                            Work experience
                        </AccordeonLabel>
                        <AccordeonContent>
                            <p>
                                I have been working as a fullstack developer for 2 years. I have worked on several projects in different fields such as e-commerce, health, and education. I have also worked on projects in the field of artificial intelligence and machine learning.
                            </p>
                        </AccordeonContent>
                    </AccordeonChildren>
                </Accordeon>

            </div>

            <div className="tech-skills">
                <h6 className="title">
                    Tech Skills
                </h6>

                <div className="row gap-sm">

                    <Accordeon
                        className="col-8"
                    >
                        <AccordeonChildren>
                            <AccordeonLabel>
                                Tech stacks
                            </AccordeonLabel>
                            <AccordeonContent>
                                
                                <BadgeContainer 
                                    title="Frontend"
                                >
                                    <BadgeWrapper>
                                        <Badge>
                                            HTML
                                        </Badge>
                                        <Badge>
                                            CSS
                                        </Badge>
                                        <Badge>
                                            JavaScript
                                        </Badge>
                                        <Badge>
                                            React
                                        </Badge>
                                        <Badge>
                                            jQuery
                                        </Badge>
                                        <Badge>
                                            SCSS
                                        </Badge>
                                        <Badge>
                                            TypeScript
                                        </Badge>
                                        <Badge>
                                            Next JS
                                        </Badge>
                                    </BadgeWrapper>
                                </BadgeContainer>
                                <br />
                                <BadgeContainer 
                                    title="Backend"
                                >
                                    <BadgeWrapper>
                                        <Badge>
                                            PHP
                                        </Badge>
                                        <Badge>
                                            Laravel
                                        </Badge>
                                        <Badge>
                                            Node JS
                                        </Badge>
                                        <Badge>
                                            Express JS
                                        </Badge>
                                        <Badge>
                                            Nest JS
                                        </Badge>
                                        <Badge>
                                            October CMS
                                        </Badge>
                                    </BadgeWrapper>
                                </BadgeContainer>
                                <br />
                                <BadgeContainer 
                                    title="Database"
                                >
                                    <BadgeWrapper>
                                        <Badge>
                                            MySQL
                                        </Badge>
                                        <Badge>
                                            PostgreSQL
                                        </Badge>
                                        <Badge>
                                            SQLite
                                        </Badge>
                                    </BadgeWrapper>
                                </BadgeContainer>
                                <br />
                                <BadgeContainer 
                                    title="Others"
                                >
                                    <BadgeWrapper>
                                        <Badge>
                                            C
                                        </Badge>
                                        <Badge>
                                            Java
                                        </Badge>
                                        <Badge>
                                            Python
                                        </Badge>
                                        <Badge>
                                            Inertia JS
                                        </Badge>
                                    </BadgeWrapper>
                                </BadgeContainer>

                            </AccordeonContent>
                        </AccordeonChildren>
                        <AccordeonChildren>
                            <AccordeonLabel>
                                Tech tools
                            </AccordeonLabel>
                            <AccordeonContent>
                                <p>
                                    I have been working as a fullstack developer for 2 years. I have worked on several projects in different fields such as e-commerce, health, and education. I have also worked on projects in the field of artificial intelligence and machine learning.
                                </p>
                            </AccordeonContent>
                        </AccordeonChildren>
                    </Accordeon>

                    <span className="col-4 quote">
                        My favorite saying is that the best programming language is <span className="highlight">the one you master</span> but I also enjoy learning new things.
                    </span>
                </div>
            </div>

            <div className="resume">
                <h6 className="title">
                    Resume
                </h6>

                <BigButton
                    href="#"
                    className="d-flex align-items-center justify-content-center"
                >
                    <span>
                        Download my resume
                    </span>
                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.5938 9.625V14.625C17.5938 14.9151 17.4785 15.1933 17.2734 15.3984C17.0683 15.6035 16.7901 15.7188 16.5 15.7188H1.5C1.20992 15.7188 0.93172 15.6035 0.726602 15.3984C0.521484 15.1933 0.40625 14.9151 0.40625 14.625V9.625C0.40625 9.33492 0.521484 9.05672 0.726602 8.8516C0.93172 8.64648 1.20992 8.53125 1.5 8.53125H4.625C4.74932 8.53125 4.86855 8.58064 4.95646 8.66854C5.04436 8.75645 5.09375 8.87568 5.09375 9C5.09375 9.12432 5.04436 9.24355 4.95646 9.33146C4.86855 9.41936 4.74932 9.46875 4.625 9.46875H1.5C1.45856 9.46875 1.41882 9.48521 1.38951 9.51451C1.36021 9.54382 1.34375 9.58356 1.34375 9.625V14.625C1.34375 14.6664 1.36021 14.7062 1.38951 14.7355C1.41882 14.7648 1.45856 14.7812 1.5 14.7812H16.5C16.5414 14.7812 16.5812 14.7648 16.6105 14.7355C16.6398 14.7062 16.6562 14.6664 16.6562 14.625V9.625C16.6562 9.58356 16.6398 9.54382 16.6105 9.51451C16.5812 9.48521 16.5414 9.46875 16.5 9.46875H13.375C13.2507 9.46875 13.1315 9.41936 13.0435 9.33146C12.9556 9.24355 12.9062 9.12432 12.9062 9C12.9062 8.87568 12.9556 8.75645 13.0435 8.66854C13.1315 8.58064 13.2507 8.53125 13.375 8.53125H16.5C16.7901 8.53125 17.0683 8.64648 17.2734 8.8516C17.4785 9.05672 17.5938 9.33492 17.5938 9.625ZM8.66875 9.33125C8.75664 9.41903 8.87578 9.46834 9 9.46834C9.12422 9.46834 9.24336 9.41903 9.33125 9.33125L13.0813 5.58125C13.1641 5.49239 13.2091 5.37486 13.207 5.25342C13.2048 5.13199 13.1556 5.01612 13.0698 4.93024C12.9839 4.84435 12.868 4.79516 12.7466 4.79302C12.6251 4.79087 12.5076 4.83595 12.4187 4.91875L9.46875 7.86797V0.875C9.46875 0.75068 9.41936 0.631451 9.33146 0.543544C9.24355 0.455636 9.12432 0.40625 9 0.40625C8.87568 0.40625 8.75645 0.455636 8.66854 0.543544C8.58064 0.631451 8.53125 0.75068 8.53125 0.875V7.86797L5.58125 4.91875C5.49239 4.83595 5.37486 4.79087 5.25342 4.79302C5.13199 4.79516 5.01612 4.84435 4.93024 4.93024C4.84435 5.01612 4.79516 5.13199 4.79302 5.25342C4.79087 5.37486 4.83595 5.49239 4.91875 5.58125L8.66875 9.33125ZM14.4688 12.125C14.4688 11.9705 14.4229 11.8194 14.3371 11.691C14.2512 11.5625 14.1292 11.4623 13.9865 11.4032C13.8437 11.3441 13.6866 11.3286 13.5351 11.3588C13.3835 11.3889 13.2443 11.4633 13.1351 11.5726C13.0258 11.6818 12.9514 11.821 12.9213 11.9726C12.8911 12.1241 12.9066 12.2812 12.9657 12.424C13.0248 12.5667 13.125 12.6887 13.2535 12.7746C13.3819 12.8604 13.533 12.9062 13.6875 12.9062C13.8947 12.9062 14.0934 12.8239 14.2399 12.6774C14.3864 12.5309 14.4688 12.3322 14.4688 12.125Z" fill="white"/>
                    </svg>
                </BigButton>

            </div>

        </Section>

        {/* Projects */}
        <Section
            title="📚 Projects"
            subtitle="Some of my projects"
            id="projects"
        >
            <Project
                title="Project 1"
                subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, odio nec vehicula."
                link="#"
            />
            <Project
                title="Project 2"
                subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, odio nec vehicula."
                link="#"
            />
            <Project
                title="Project 3"
                subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, odio nec vehicula."
                link="#"
            />
        </Section>

        {/* Sandbox */}
        <Section
            title="🧪 Sandbox"
            subtitle="Some of my less impactful projects"
            id="sandbox"
        >
            <Project
                title="Project 1"
                subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, odio nec vehicula."
                link="/project"
            />
            <Project
                title="Project 2"
                subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, odio nec vehicula."
                link="#"
            />
            <Project
                title="Project 3"
                subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, odio nec vehicula."
                link="#"
            />
        </Section>


        {/* Contact */}
        <Section
            title="📬 Contact"
            subtitle="Get in touch"
            id="contact"
        >
            <div className="row flex-column gap-xs">
                <BigButton
                    link="#"
                    className="d-flex align-items-center justify-content-between"
                >
                    <div className="row align-items-center gap-sm">
                        <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.5674 0.75H2.36738C1.59738 0.75 0.974377 1.37344 0.974377 2.13542L0.967377 10.4479C0.967377 11.2099 1.59738 11.8333 2.36738 11.8333H13.5674C14.3374 11.8333 14.9674 11.2099 14.9674 10.4479V2.13542C14.9674 1.37344 14.3374 0.75 13.5674 0.75ZM13.5674 3.52083L7.96738 6.98438L2.36738 3.52083V2.13542L7.96738 5.59896L13.5674 2.13542V3.52083Z" fill="white"/>
                        </svg>
                        <span>
                            Contact me via Email
                        </span>
                    </div>
                    <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.062477 6L12.2958 6L7.05297 0.75L7.71207 0L14.2032 6.5L7.71207 13L7.05297 12.25L12.2958 7L0.062477 7V6Z" fill="#CECECE"/>
                    </svg>
                </BigButton>
                <BigButton
                    link="#"
                    className="d-flex align-items-center justify-content-between"
                >
                    <div className="row align-items-center gap-sm">
                        <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.5674 0.75H2.36738C1.59738 0.75 0.974377 1.37344 0.974377 2.13542L0.967377 10.4479C0.967377 11.2099 1.59738 11.8333 2.36738 11.8333H13.5674C14.3374 11.8333 14.9674 11.2099 14.9674 10.4479V2.13542C14.9674 1.37344 14.3374 0.75 13.5674 0.75ZM13.5674 3.52083L7.96738 6.98438L2.36738 3.52083V2.13542L7.96738 5.59896L13.5674 2.13542V3.52083Z" fill="white"/>
                        </svg>
                        <span>
                            Contact me via Email
                        </span>
                    </div>
                    <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.062477 6L12.2958 6L7.05297 0.75L7.71207 0L14.2032 6.5L7.71207 13L7.05297 12.25L12.2958 7L0.062477 7V6Z" fill="#CECECE"/>
                    </svg>
                </BigButton>
                <BigButton
                    link="#"
                    className="d-flex align-items-center justify-content-between"
                >
                    <div className="row align-items-center gap-sm">
                        <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.5674 0.75H2.36738C1.59738 0.75 0.974377 1.37344 0.974377 2.13542L0.967377 10.4479C0.967377 11.2099 1.59738 11.8333 2.36738 11.8333H13.5674C14.3374 11.8333 14.9674 11.2099 14.9674 10.4479V2.13542C14.9674 1.37344 14.3374 0.75 13.5674 0.75ZM13.5674 3.52083L7.96738 6.98438L2.36738 3.52083V2.13542L7.96738 5.59896L13.5674 2.13542V3.52083Z" fill="white"/>
                        </svg>
                        <span>
                            Contact me via Email
                        </span>
                    </div>
                    <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.062477 6L12.2958 6L7.05297 0.75L7.71207 0L14.2032 6.5L7.71207 13L7.05297 12.25L12.2958 7L0.062477 7V6Z" fill="#CECECE"/>
                    </svg>
                </BigButton>
            </div>

        </Section>




    </>
}

Home.layout = page => <Layout children={page} page="home" isOnHome={true}/>

export default Home