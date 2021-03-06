import { DOMParser } from 'xmldom';
interface IRequest {
    xml: string;
}
export class Xml {

    private static Singleton: Xml;


    public static Instance = () => {
        if (!Xml.Singleton) {
            Xml.Singleton = new Xml();
        }

        return Xml.Singleton;
    };

    public deserializeXml = ({ xml }: IRequest): string => {
        const doc: Document = new DOMParser().parseFromString(xml);
        return doc.getElementsByTagName('value')[0].childNodes[0].nodeValue;
    };
}
