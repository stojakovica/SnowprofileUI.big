package at.ac.dbisinformatik.snowprofile.web.svgcreator;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;

import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.apache.batik.dom.svg.SVGDOMImplementation;
import org.apache.batik.transcoder.TranscoderException;
import org.apache.batik.transcoder.TranscoderInput;
import org.apache.batik.transcoder.TranscoderOutput;
import org.apache.batik.transcoder.image.JPEGTranscoder;
import org.apache.batik.transcoder.image.PNGTranscoder;
import org.apache.commons.io.output.ByteArrayOutputStream;
import org.apache.fop.svg.PDFTranscoder;
import org.w3c.dom.DOMImplementation;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.orientechnologies.orient.core.serialization.OBase64Utils.OutputStream;

/**
 * @author Robert Binna
 * 
 */
public class SVGCreator {
	
	public static void savePNG(String svgURI, String fileName) throws TranscoderException, IOException {
		URL url = SVGCreator.class.getResource("/at/ac/dbisinformatik/snowprofile/web/resources/data/svgcreator/tmp/png/");
		File file = new File(url.toString().substring(6) + ""+fileName+".png");
		FileOutputStream ostream = new FileOutputStream(file);
		
		PNGTranscoder t = new PNGTranscoder();
		TranscoderInput input = new TranscoderInput(new FileInputStream(svgURI));
		TranscoderOutput output = new TranscoderOutput(ostream);
		
		t.transcode(input, output);
		
		ostream.flush();
		ostream.close();
	}

	public static void saveJPG(String svgURI, String fileName) throws TranscoderException, IOException {
		URL url = SVGCreator.class.getResource("/at/ac/dbisinformatik/snowprofile/web/resources/data/svgcreator/tmp/jpg/");
		File file = new File(url.toString().substring(6) + ""+fileName+".jpg");
		FileOutputStream ostream = new FileOutputStream(file);

		JPEGTranscoder t = new JPEGTranscoder();
		t.addTranscodingHint(JPEGTranscoder.KEY_QUALITY, new Float(.8));
		TranscoderInput input = new TranscoderInput(new FileInputStream(svgURI));
		TranscoderOutput output = new TranscoderOutput(ostream);

		t.transcode(input, output);

		ostream.flush();
		ostream.close();
	}

	public static void createPDF(String svgURI, String fileName) throws IOException {
		// TODO: create ByteArrayOutputStream PDF
		ByteArrayOutputStream returnDocument = null;
		URL url = SVGCreator.class.getResource("/at/ac/dbisinformatik/snowprofile/web/resources/data/svgcreator/tmp/pdf/");
		File file = new File(url.toString().substring(6) + ""+fileName+".pdf");
		FileOutputStream out = new FileOutputStream(file);
		
		PDFTranscoder t = new PDFTranscoder();
		TranscoderInput input = new TranscoderInput(new FileInputStream(svgURI));
		TranscoderOutput output = new TranscoderOutput(out);
		
		try {
			t.transcode(input, output);
		} catch (Exception ex) {
			throw new IOException(ex.getMessage());
		} finally {
			out.flush();
			out.close();
		}
	}

	public static void svgDocument(JsonArray jsonDocument, String exportType, String profileID)
			throws TransformerException, URISyntaxException,
			TranscoderException, IOException {
		
		DOMImplementation impl = SVGDOMImplementation.getDOMImplementation();
		String svgNS = SVGDOMImplementation.SVG_NAMESPACE_URI;
		Document doc = impl.createDocument(svgNS, "svg", null);

		// Get the root element (the 'svg' element).
		Element svgRoot = doc.getDocumentElement();

		// Set the width and height attributes on the root 'svg' element.
		svgRoot.setAttributeNS(null, "width", "1500");
		svgRoot.setAttributeNS(null, "height", "1500");
		JsonArray items = jsonDocument;

		for (int i = 0; i < items.size(); ++i) {
			String type = items.get(i).getAsJsonObject().get("type")
					.getAsString();
			Element element = null;
			org.w3c.dom.Text test = null;
			String path = "";
			String width = "";
			String height = "";
			String x = "";
			String y = "";
			String fill = "";
			String text = "";
			String font = "";
			String fontFamily = "";
			String fontSize = "";
			String degrees = "";
			String stroke = "";
			String opacity = "";
			String src = "";
			switch (type) {
			case "rect":
				width = items.get(i).getAsJsonObject().get("width")
						.getAsString();
				height = items.get(i).getAsJsonObject().get("height")
						.getAsString();
				x = items.get(i).getAsJsonObject().get("x").getAsString();
				y = items.get(i).getAsJsonObject().get("y").getAsString();
				fill = items.get(i).getAsJsonObject().get("fill").getAsString();
				stroke = items.get(i).getAsJsonObject().get("stroke")
						.getAsString();
				opacity = items.get(i).getAsJsonObject().get("opacity")
						.getAsString();

				// Create the rectangle.
				element = doc.createElementNS(svgNS, "rect");
				element.setAttributeNS(null, "width", width);
				element.setAttributeNS(null, "height", height);
				element.setAttributeNS(null, "x", x);
				element.setAttributeNS(null, "y", y);
				element.setAttributeNS(null, "fill", fill);
				element.setAttributeNS(null, "stroke", stroke);
				element.setAttributeNS(null, "opacity", opacity);
				break;

			case "path":
				path = items.get(i).getAsJsonObject().get("path").getAsString();
				fill = items.get(i).getAsJsonObject().get("fill").getAsString();
				stroke = items.get(i).getAsJsonObject().get("stroke")
						.getAsString();

				// Create the path.
				element = doc.createElementNS(svgNS, "path");
				element.setAttributeNS(null, "d", path);
				element.setAttributeNS(null, "fill", fill);
				element.setAttributeNS(null, "stroke", stroke);
				break;

			case "image":
				x = items.get(i).getAsJsonObject().get("x").getAsString();
				y = items.get(i).getAsJsonObject().get("y").getAsString();
				width = items.get(i).getAsJsonObject().get("width").getAsString();
				height = items.get(i).getAsJsonObject().get("height").getAsString();
				src = System.class.getResource("/at/ac/dbisinformatik/snowprofile/web/resources/" + items.get(i).getAsJsonObject().get("src").getAsString()).toString();

				// Create the path.
				element = doc.createElementNS(svgNS, "image");
				element.setAttributeNS(null, "x", x);
				element.setAttributeNS(null, "y", y);
				element.setAttributeNS(null, "width", width);
				element.setAttributeNS(null, "height", height);
				element.setAttributeNS(null, "xlink:href", src);
				break;

			case "text":
				text = items.get(i).getAsJsonObject().get("text").getAsString();
				fill = items.get(i).getAsJsonObject().get("fill").getAsString();
				font = items.get(i).getAsJsonObject().get("font").getAsString();
				x = items.get(i).getAsJsonObject().get("x").getAsString();
				y = items.get(i).getAsJsonObject().get("y").getAsString();

				// Transformation
				if (items.get(i).getAsJsonObject().get("rotate") != null) {
					JsonObject temp = items.get(i).getAsJsonObject()
							.get("rotate").getAsJsonObject();
					degrees = temp.get("degrees").getAsString();
				}

				fontSize = font.split(" ")[0];
				fontFamily = font.split(" ")[1];

				// Create the text.
				test = doc.createTextNode(text);
				element = doc.createElementNS(svgNS, "text");
				element.setAttributeNS(null, "text", text);
				element.setAttributeNS(null, "fill", fill);
				element.setAttributeNS(null, "font-family", fontFamily);
				element.setAttributeNS(null, "font-size", fontSize);
				element.setAttributeNS(null, "x", x);
				element.setAttributeNS(null, "y", y);
				if (!degrees.equals("")) {
					// element.setAttributeNS(null, "transform",
					// "rotate(270 "+500+","+80+")");
				}
				element.appendChild(test);
				break;

			default:
				break;
			}

			// Attach the rectangle to the root 'svg' element.
			svgRoot.appendChild(element);
		}

		TransformerFactory tFactory = TransformerFactory.newInstance();
		Transformer transformer = tFactory.newTransformer();
		
		String fileName = "snowprofile"+profileID;
		fileName = fileName.replace("#", "_");
		fileName = fileName.replace(":", "_");
		DOMSource source = new DOMSource(doc);
		URL url = SVGCreator.class.getResource("/at/ac/dbisinformatik/snowprofile/web/resources/data/svgcreator/tmp/");
		File file = new File(url.toString().substring(6) +""+fileName+".svg");
		StreamResult result = new StreamResult(new FileOutputStream(file));
		transformer.transform(source, result);
		
		switch (exportType) {
		case "png":
//			savePNG(file.toPath().toString(), fileName);
			break;
			
		case "jpg":
//			saveJPG(file.toPath().toString(), fileName);
			break;
			
		case "pdf":
			createPDF(file.toPath().toString(), fileName);
			break;

		default:
			break;
		}
	}
}
