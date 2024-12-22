import Layout from "@/Layouts/minimalist";

import { Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { useRoute } from "ziggy";

import { Tooltip } from "@/Components/minimalist/Tooltip";
import { Section } from "@/Components/minimalist/Section";
import { Project } from "@/Components/minimalist/Project";
import { BigButton } from "@/Components/minimalist/BigButton";

import {
    Badge,
    BadgeWrapper,
    BadgeContainer,
} from "@/Components/minimalist/Badge";

import {
    Accordeon,
    AccordeonChildren,
    AccordeonContent,
    AccordeonLabel,
} from "@/Components/minimalist/Accordeon";

function Home({ stackCategories, projects, toolCategories, user, socials }) {
    const props = usePage().props;
    const route = useRoute();


    return (
        <>
            {/* Hero */}
            <section id="hero">
                <Tooltip label="Click to view full size">
                    <a href={user.full_pfp_url} target="_blank">
                        <img
                            src={user.full_pfp_url}
                            alt={user.pfp_label}
                            className="photo"
                        />
                    </a>
                </Tooltip>
                <div className="content">
                    <h1>Hakim Fidjel</h1>
                    <p>
                        Aiming to build the Future, one line of code at a time
                    </p>
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
                        Driven by a love for technology, I find joy in
                        everything computer science has to offer—web
                        development, programming, and tackling challenges
                        head-on. For me, every line of code is a step closer to
                        building something impactful.
                    </p>
                    <p>
                        As an engineering student at IG2I Centrale Lille, I’m
                        constantly exploring new technologies and refining
                        workflows to bridge the gap between innovation and
                        real-world solutions.
                    </p>
                </div>

                <div className="work-history">
                    <h6 className="title">Work History</h6>
                    <Accordeon>
                        <AccordeonChildren>
                            <AccordeonLabel>School & Diplomas</AccordeonLabel>
                            <AccordeonContent>
                                <div>
                                    <h3 className="title">
                                        🎓 Lycée Auguste Angellier (2018-2021)
                                    </h3>
                                    <p>
                                        I completed my high school studies at
                                        Lycée Auguste Angellier, earning a
                                        Scientific Baccalaureate in 2021. This
                                        solid foundation in mathematics and
                                        sciences sparked my passion for
                                        technology and problem-solving.
                                    </p>

                                    <br />
                                    <hr />
                                    <br />

                                    <h3 className="title">
                                        🎓 IG2I Centrale Lille (2021-2026)
                                    </h3>
                                    <p>
                                        Currently in my 4th year at IG2I
                                        Centrale Lille, I am pursuing an
                                        engineering degree specializing in
                                        industrial and computer science. The
                                        program combines academic excellence
                                        with real-world applications through
                                        hands-on projects and professional
                                        training.
                                    </p>

                                    <br />
                                    <hr />
                                    <br />

                                    <p>
                                        These experiences have shaped my
                                        technical and analytical mindset,
                                        preparing me for future challenges in
                                        the tech world.
                                    </p>
                                </div>
                            </AccordeonContent>
                        </AccordeonChildren>
                        <AccordeonChildren>
                            <AccordeonLabel>Work experience</AccordeonLabel>
                            <AccordeonContent>
                                <div>
                                    <h3 className="title">
                                        💼 Fullstack Engineer - Apprentice
                                        (09/23 - Present)
                                    </h3>
                                    <p>
                                        At Réservoir Digital, I oversee the
                                        development of web projects from
                                        analysis to production. My role includes
                                        ensuring compliance with business needs,
                                        streamlining workflows, and modernizing
                                        internal processes.
                                    </p>

                                    <br />
                                    <hr />
                                    <br />

                                    <h3 className="title">
                                        🔧 Fullstack Developer - Intern (05/23 -
                                        08/23)
                                    </h3>
                                    <p>
                                        During my internship at Réservoir
                                        Digital, I improved my skills in new
                                        technologies while contributing to
                                        digital solution development.
                                        Collaborating within a team was a key
                                        part of this experience.
                                    </p>

                                    <br />
                                    <hr />
                                    <br />

                                    <h3 className="title">
                                        🌐 IT Technician & Web Developer -
                                        Intern (06/22 - 08/22)
                                    </h3>
                                    <p>
                                        At Hôpital Maritime de Zuydcoote, I
                                        managed IT infrastructure to ensure
                                        system connectivity and reliability. I
                                        also developed an internal website that
                                        optimized patient file management,
                                        replacing outdated Excel processes.
                                    </p>

                                    <br />
                                    <hr />
                                    <br />

                                    <p>
                                        These roles have sharpened my ability to
                                        deliver efficient, innovative solutions
                                        while adapting to diverse professional
                                        environments.
                                    </p>
                                </div>
                            </AccordeonContent>
                        </AccordeonChildren>
                    </Accordeon>
                </div>

                <div className="tech-skills">
                    <h6 className="title">Tech Skills</h6>

                    <div className="row gap-sm resp-flex-column">
                        <Accordeon className="col-8 resp-col-12">
                            <AccordeonChildren>
                                <AccordeonLabel>Tech stacks</AccordeonLabel>
                                <AccordeonContent>
                                    <div>

                                        {stackCategories.length > 0 ? (
                                            stackCategories.map(
                                                (category, index) => (
                                                    <>
                                                        <BadgeContainer
                                                            key={`stackcategory-${category.id}`}
                                                            title={category.label}
                                                        >
                                                            <BadgeWrapper>
                                                                {category.stacks.map((stack) => (
                                                                        <Badge
                                                                            key={`stack-${stack.id}`}
                                                                        >
                                                                            {stack.label}
                                                                        </Badge>
                                                                    )
                                                                )}
                                                            </BadgeWrapper>
                                                        </BadgeContainer>

                                                        {(index < stackCategories.length - 1) && (
                                                            <br />
                                                        )}
                                                    </>
                                                )
                                            )
                                        ) : (
                                            <div>No stacks available</div>
                                        )}
                                    </div>
                                </AccordeonContent>
                            </AccordeonChildren>
                            <AccordeonChildren>
                                <AccordeonLabel>Tech tools</AccordeonLabel>
                                <AccordeonContent>
                                    <div>

                                        {toolCategories.length > 0 ? (
                                            toolCategories.map((category, index) => (
                                                    <>
                                                        <BadgeContainer
                                                            key={`toolcategory-${category.id}`}
                                                            title={category.label}
                                                        >
                                                            <BadgeWrapper>
                                                                {category.tools.map((tool) => (
                                                                        <Badge
                                                                            key={`tool-${tool.id}`}
                                                                        >
                                                                            {tool.label}
                                                                        </Badge>
                                                                    )
                                                                )}
                                                            </BadgeWrapper>
                                                        </BadgeContainer>

                                                        {(index < toolCategories.length - 1) && (
                                                            <br />
                                                        )}
                                                    </>
                                                )
                                            )
                                        ) : (
                                            <div>No tools available</div>
                                        )}
                                    </div>
                                </AccordeonContent>
                            </AccordeonChildren>
                        </Accordeon>

                        <span className="col-4 quote resp-col-12">
                            My journey balances{" "}
                            <span className="highlight">expertise</span> in
                            tools I know and excitement for those I’ve yet to{" "}
                            <span className="highlight">explore.</span>
                        </span>
                    </div>
                </div>

                {user.full_resume_path != "/storage/" && (

                    <div className="resume">
                        <h6 className="title">Resume</h6>

                        <BigButton
                            href={user.full_resume_path}
                            target="_blank"
                            className="d-flex align-items-center justify-content-center"
                        >
                            <span>Download my resume</span>
                            <svg
                                width="18"
                                height="16"
                                viewBox="0 0 18 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M17.5938 9.625V14.625C17.5938 14.9151 17.4785 15.1933 17.2734 15.3984C17.0683 15.6035 16.7901 15.7188 16.5 15.7188H1.5C1.20992 15.7188 0.93172 15.6035 0.726602 15.3984C0.521484 15.1933 0.40625 14.9151 0.40625 14.625V9.625C0.40625 9.33492 0.521484 9.05672 0.726602 8.8516C0.93172 8.64648 1.20992 8.53125 1.5 8.53125H4.625C4.74932 8.53125 4.86855 8.58064 4.95646 8.66854C5.04436 8.75645 5.09375 8.87568 5.09375 9C5.09375 9.12432 5.04436 9.24355 4.95646 9.33146C4.86855 9.41936 4.74932 9.46875 4.625 9.46875H1.5C1.45856 9.46875 1.41882 9.48521 1.38951 9.51451C1.36021 9.54382 1.34375 9.58356 1.34375 9.625V14.625C1.34375 14.6664 1.36021 14.7062 1.38951 14.7355C1.41882 14.7648 1.45856 14.7812 1.5 14.7812H16.5C16.5414 14.7812 16.5812 14.7648 16.6105 14.7355C16.6398 14.7062 16.6562 14.6664 16.6562 14.625V9.625C16.6562 9.58356 16.6398 9.54382 16.6105 9.51451C16.5812 9.48521 16.5414 9.46875 16.5 9.46875H13.375C13.2507 9.46875 13.1315 9.41936 13.0435 9.33146C12.9556 9.24355 12.9062 9.12432 12.9062 9C12.9062 8.87568 12.9556 8.75645 13.0435 8.66854C13.1315 8.58064 13.2507 8.53125 13.375 8.53125H16.5C16.7901 8.53125 17.0683 8.64648 17.2734 8.8516C17.4785 9.05672 17.5938 9.33492 17.5938 9.625ZM8.66875 9.33125C8.75664 9.41903 8.87578 9.46834 9 9.46834C9.12422 9.46834 9.24336 9.41903 9.33125 9.33125L13.0813 5.58125C13.1641 5.49239 13.2091 5.37486 13.207 5.25342C13.2048 5.13199 13.1556 5.01612 13.0698 4.93024C12.9839 4.84435 12.868 4.79516 12.7466 4.79302C12.6251 4.79087 12.5076 4.83595 12.4187 4.91875L9.46875 7.86797V0.875C9.46875 0.75068 9.41936 0.631451 9.33146 0.543544C9.24355 0.455636 9.12432 0.40625 9 0.40625C8.87568 0.40625 8.75645 0.455636 8.66854 0.543544C8.58064 0.631451 8.53125 0.75068 8.53125 0.875V7.86797L5.58125 4.91875C5.49239 4.83595 5.37486 4.79087 5.25342 4.79302C5.13199 4.79516 5.01612 4.84435 4.93024 4.93024C4.84435 5.01612 4.79516 5.13199 4.79302 5.25342C4.79087 5.37486 4.83595 5.49239 4.91875 5.58125L8.66875 9.33125ZM14.4688 12.125C14.4688 11.9705 14.4229 11.8194 14.3371 11.691C14.2512 11.5625 14.1292 11.4623 13.9865 11.4032C13.8437 11.3441 13.6866 11.3286 13.5351 11.3588C13.3835 11.3889 13.2443 11.4633 13.1351 11.5726C13.0258 11.6818 12.9514 11.821 12.9213 11.9726C12.8911 12.1241 12.9066 12.2812 12.9657 12.424C13.0248 12.5667 13.125 12.6887 13.2535 12.7746C13.3819 12.8604 13.533 12.9062 13.6875 12.9062C13.8947 12.9062 14.0934 12.8239 14.2399 12.6774C14.3864 12.5309 14.4688 12.3322 14.4688 12.125Z"
                                    fill="white"
                                />
                            </svg>
                        </BigButton>
                    </div>

                )}



            </Section> 

            {/* Projects */}
            <Section
                title="📚 Projects"
                subtitle="Take a look at my projects"
                id="projects"
            >
                {projects.length > 0 ? (
                    projects
                        .filter((project) => project.type === "project")
                        .map((project, index) => (
                            <Project
                                key={`project-` + index}
                                title={project.title}
                                subtitle={project.subtitle}
                                link={route("project", [
                                    project.slug,
                                    project.id,
                                ])}
                            />
                        ))
                ) : (
                    <div className="empty">
                        <p>
                            I haven't added any projects yet. Please check back
                            later.
                        </p>
                    </div>
                )}
            </Section>

            {/* Sandbox */}
            <Section
                title="🧪 Sandbox"
                subtitle="My less impactful but still taughtful works"
                id="sandbox"
            >
                {projects.length > 0 ? (
                    projects
                        .filter((project) => project.type === "lab")
                        .map((project, index) => (
                            <Project
                                key={`lab-` + index}
                                title={project.title}
                                subtitle={project.subtitle}
                                link={route("project", [
                                    project.slug,
                                    project.id,
                                ])}
                            />
                        ))
                ) : (
                    <div className="empty">
                        <p>
                            I haven't added any minor works yet. Please check
                            back later.
                        </p>
                    </div>
                )}
            </Section>

            {/* Contact */}
            <Section title="📬 Contact" subtitle="Get in touch" id="contact">
                <div className="row flex-column gap-xs">
                    {socials.length > 0 ? (
                        socials.map((social, index) => (
                            <BigButton
                                key={`social-` + index}
                                link={social.url}
                                className="d-flex align-items-center justify-content-between"
                                target="_blank"
                            >
                                <div className="row align-items-center gap-sm">
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: social.svg,
                                        }}
                                    />

                                    <span>Contact me via {social.label}</span>
                                </div>
                                <svg
                                    width="15"
                                    height="13"
                                    viewBox="0 0 15 13"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M0.062477 6L12.2958 6L7.05297 0.75L7.71207 0L14.2032 6.5L7.71207 13L7.05297 12.25L12.2958 7L0.062477 7V6Z"
                                        fill="#CECECE"
                                    />
                                </svg>
                            </BigButton>
                        ))
                    ) : (
                        <div className="empty">
                            <p>
                                I haven't added any social links yet. Please
                                check back later.
                            </p>
                        </div>
                    )}
                </div>
            </Section>
        </>
    );
}

Home.layout = (page) => {
    const props = page.props;
    return (
        <Layout
            children={page}
            page="home"
            isOnHome={true}
            version={props.version}
            title="Home"
            
        />
    );
};

export default Home;
