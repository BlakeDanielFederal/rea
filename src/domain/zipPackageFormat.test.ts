import { describe, expect, it } from "vitest";

import {
  ZIP_PACKAGE_FORMATS,
  isZipPackageFormat,
  zipPackageFormatForPath,
  zipRootPackageFormat,
} from "./zipPackageFormat.js";

describe("JVM archive package naming", () => {
  it("names jar, war and ear roots as their own ZIP families", () => {
    expect(zipRootPackageFormat("deployments/newchemreview.war")).toBe("war");
    expect(zipRootPackageFormat("build/lib/app.jar")).toBe("jar");
    expect(zipRootPackageFormat("ear/application.ear")).toBe("ear");
    expect(zipRootPackageFormat("bundles/bundle.zip")).toBe("zip");
  });

  it("names nested JVM archive members by suffix", () => {
    expect(
      zipPackageFormatForPath("WEB-INF/lib/spring-core-4.1.6.RELEASE.jar"),
    ).toBe("jar");
    expect(zipPackageFormatForPath("WEB-INF/classes/app.war")).toBe("war");
    expect(zipPackageFormatForPath("lib/client.ear")).toBe("ear");
    expect(zipPackageFormatForPath("data.har")).toBeUndefined();
  });

  it("admits the JVM archive families as ZIP-backed packages", () => {
    for (const format of ["jar", "war", "ear"] as const) {
      expect(isZipPackageFormat(format)).toBe(true);
      expect(ZIP_PACKAGE_FORMATS).toContain(format);
    }
    expect(isZipPackageFormat("har")).toBe(false);
  });
});
