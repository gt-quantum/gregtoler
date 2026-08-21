// Person segmentation via Apple Vision → writes a grayscale PNG mask (white = person).
// usage: swift segment.swift <in.png> <out-mask.png>
import Foundation
import Vision
import CoreImage
import AppKit

let args = CommandLine.arguments
guard args.count == 3, let img = NSImage(contentsOfFile: args[1]),
      let cg = img.cgImage(forProposedRect: nil, context: nil, hints: nil) else {
    FileHandle.standardError.write("usage / load failed\n".data(using: .utf8)!); exit(1)
}
let req = VNGeneratePersonSegmentationRequest()
req.qualityLevel = .accurate
req.outputPixelFormat = kCVPixelFormatType_OneComponent8
let handler = VNImageRequestHandler(cgImage: cg, options: [:])
try handler.perform([req])
guard let buf = req.results?.first?.pixelBuffer else { print("no result"); exit(2) }
let ci = CIImage(cvPixelBuffer: buf)
let scaleX = CGFloat(cg.width) / ci.extent.width, scaleY = CGFloat(cg.height) / ci.extent.height
let scaled = ci.transformed(by: CGAffineTransform(scaleX: scaleX, y: scaleY))
let ctx = CIContext()
guard let outCG = ctx.createCGImage(scaled, from: CGRect(x: 0, y: 0, width: cg.width, height: cg.height)) else { exit(3) }
let rep = NSBitmapImageRep(cgImage: outCG)
let data = rep.representation(using: .png, properties: [:])!
try data.write(to: URL(fileURLWithPath: args[2]))
print("mask \(cg.width)x\(cg.height)")
