import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Avatar from "./Avatar";

export type BiographyProps = SliceComponentProps<Content.BiographySlice>;

const Biography = ({ slice }: BiographyProps): JSX.Element => {
    const anchorId = "biography";

    return (
        <div id={anchorId}>
            <Bounded
                data-slice-type={slice.slice_type}
                data-slice-variation={slice.variation}
            >
                <div className="grid gap-x-8 gap-y-6 md:grid-cols-[2fr,1fr]">
                    <Heading as="h1" size="xl" className="col-start-1">
                        {slice.primary.heading}
                    </Heading>
                    <div className="prose prose-xl prose-slate prose-invert col-start-1">
                        <PrismicRichText field={slice.primary.description} />
                    </div>
                    <Button
                        isExternalLink={true}
                        externalUrl="/docs/Resume.pdf"
                        label="Resume"
                        showIcon={true}
                    />
                    <Avatar image={slice.primary.avatar} className="row-start-1 max-w-sm md:col-start-2 md:row-end-3" />
                </div>
            </Bounded>
        </div>
    );
};

export default Biography;
