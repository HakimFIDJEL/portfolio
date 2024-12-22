import Layout from "@/Layouts/minimalist";

import React, { useState } from "react";

import { Link } from "@inertiajs/react";
import { useRoute } from "ziggy";

import { Tooltip } from "@/Components/minimalist/Tooltip";
import { BigButton } from "@/Components/minimalist/BigButton";
import { Block } from "@/Components/minimalist/Block";
import { Carrousel } from "@/Components/minimalist/Carrousel";



import {
    Badge,
    BadgeWrapper,
    BadgeContainer,
} from "@/Components/minimalist/Badge";

import { Timeline, TimelineItem } from "@/Components/minimalist/Timeline";

function Project({ project }) {
    const route = useRoute();

    // Remove empty description
    if(project.description && project.description == "<p></p>") {
        project.description = null;
    }

    // Remove empty feedback
    if(project.feedback && project.feedback == "<p></p>") {
        project.feedback = null;
    }

    // Remove empty what_i_learned
    if(project.what_i_learned && project.what_i_learned == "<p></p>") {
        project.what_i_learned = null;
    }

    const [collapsedDescription, setCollapsedDescription] = useState(true);
    const [collapsedTimeline, setCollapsedTimeline] = useState(true);
    const [collapsedImages, setCollapsedImages] = useState(true);

    function formatDate(date) {
        const options = { year: "numeric", month: "short", day: "numeric" };
        return new Date(date).toLocaleDateString("en-US", options);
    }

    return (
        <>
            <section id="hero" className="row flex-column">
                <div className="container row justify-content-between gap-md resp-flex-column">
                    <span className="title row flex-column gap-xs">
                        <h1>{project.title}</h1>
                        <p className="quote-text">{project.subtitle}</p>
                    </span>
                    <span className="links d-flex align-items-center gap-xs">
                        <Tooltip label="Source code">
                            <a
                                href={project.source_code_url ?? "#"}
                                target="_blank"
                                className={`hover__effect fill ${
                                    project.source_code_url ? "" : "disabled"
                                }`}
                            >
                                <svg
                                    width="24"
                                    height="16"
                                    viewBox="0 0 24 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M23.25 8L18 13.25L16.9425 12.1925L21.1275 8L16.9425 3.8075L18 2.75L23.25 8ZM0.75 8L6 2.75L7.0575 3.8075L2.8725 8L7.0575 12.1925L6 13.25L0.75 8ZM9.315 15.113L13.23 0.5L14.679 0.88775L10.764 15.5L9.315 15.113Z"
                                        fill="#C9D1D9"
                                    />
                                </svg>
                            </a>
                        </Tooltip>
                        <Tooltip label="Live demo">
                            <a
                                href={project.live_demo_url ?? "#"}
                                target="_blank"
                                className={`hover__effect stroke ${
                                    project.live_demo_url ? "" : "disabled"
                                }`}
                            >
                                <svg
                                    width="12"
                                    height="11"
                                    viewBox="0 0 12 11"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M0.75 0.5H10.75M10.75 0.5V10.5M10.75 0.5L0.75 10.5"
                                        stroke="#C9D1D9"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </a>
                        </Tooltip>
                    </span>
                </div>
                <hr />
                <div className="footer row justify-content-between gap-lg resp-gap-sm resp-flex-column">
                    <BadgeContainer title="Tech stack">
                        <BadgeWrapper>
                            {project.stacks.length > 0 ? (
                                project.stacks.map((stack, index) => (
                                    <Badge key={`project-stack-` + index}>
                                        {stack.label}
                                    </Badge>
                                ))
                            ) : (
                                <Badge>None</Badge>
                            )}
                        </BadgeWrapper>
                    </BadgeContainer>

                    <BadgeContainer title="End date">
                        <BadgeWrapper>
                            {project.end_date ? (
                                // <Badge>18 Oct. 2024</Badge>
                                <Badge>{formatDate(project.end_date)}</Badge>
                            ) : (
                                <Badge>Work in progress</Badge>
                            )}
                        </BadgeWrapper>
                    </BadgeContainer>
                </div>
            </section>

            <section id="infos">
                <div className="flex-column d-flex gap-xs">
                    {project.description && (
                        <Block
                            title="📝 Description"
                            collapsable={true}
                            className="col-12"
                            onCollapse={(bool) => setCollapsedDescription(bool)}
                        >
                            <div className="row flex-column gap-re">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: project.description,
                                    }}
                                />

                                {project.readme_url && (
                                    <Tooltip label="I think you know how to read...">
                                        <a
                                            href={
                                                !collapsedDescription
                                                    ? project.readme_url
                                                    : undefined
                                            }
                                            className="col-12 hover__effect"
                                            id="see-readme"
                                            target="_blank"
                                        >
                                            See full README
                                        </a>
                                    </Tooltip>
                                )}
                            </div>
                        </Block>
                    )}

                    {(project.timeline && project.timeline.length > 0) && (
                        <Block
                            title="⏳ Timeline"
                            collapsable={true}
                            className="col-12"
                            onCollapse={(bool) => setCollapsedTimeline(bool)}
                        >
                            <div className="row flex-column">
                                <Timeline
                                    disabled={collapsedTimeline}
                                    className="mb-md"
                                >
                                    {project.timeline.map((event, index) => (
                                        <TimelineItem
                                            key={`project-timeline-` + index}
                                            label={event.title}
                                            date={formatDate(event.date)}
                                            duration={event.duration}
                                        />
                                    ))}
                                </Timeline>

                                {/* <hr /> */}

                                {project.timeline_url && (
                                    <Tooltip label="I think you know how to read...">
                                        <a
                                            href={
                                                !collapsedTimeline
                                                    ? project.timeline_url
                                                    : undefined
                                            }
                                            className="col-12 hover__effect"
                                            id="see-full-timeline"
                                            target="_blank"
                                        >
                                            See full timeline
                                        </a>
                                    </Tooltip>
                                )}
                            </div>
                        </Block>
                    )}
                </div>
            </section>

            {(project.images && project.images.length > 0) && (
                <>
                    <Block
                        title="🖼️ Images"
                        collapsable={true}
                        className="col-12"
                        onCollapse={(bool) => setCollapsedImages(bool)}
                    >
                        <section id="images">
                            <p className="quote-text">
                                Hover on the images to see the caption or click on them to see in full size.
                            </p>
                            <Carrousel
                                navigation={true}
                                pagination={true}
                                disabled={collapsedImages}
                            >
                                {project.images.map((image, index) => (
                                    <img
                                        src={image.full_url}
                                        alt={image.caption}
                                        key={`project-image-` + index}
                                    />
                                ))}
                            </Carrousel>
                        </section>
                    </Block>
                </>
            )}

            {project.feedback && (
                <section id="feedback">
                    <Block
                        title="💬 Feedback"
                        collapsable={true}
                        className="col-12"
                    >
                        <div
                            dangerouslySetInnerHTML={{
                                __html: project.feedback,
                            }}
                        />
                    </Block>
                </section>
            )}
            {project.what_i_learned && (
                <section id="what_i_learned">
                    <Block
                        title="🧠 What I learned with it"
                        collapsable={true}
                        className="col-12"
                    >
                        <div
                            dangerouslySetInnerHTML={{
                                __html: project.what_i_learned,
                            }}
                        />
                    </Block>
                </section>
            )}
        </>
    );
}

Project.layout = (page) => {
    const props = page.props;
    const project = props.project;
    return (
        <Layout
            children={page}
            page="project"
            isOnHome={false}
            version={props.version}
            title={project.title}
            description={project.subtitle}
        />
    );
};

export default Project;
