/*

*/
package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
)

func main() {
	// commandline flag
	port := flag.Int("port", 8080, "port serves on")
	dir := flag.String("directory", "./", "directory of your files")
	flag.Parse()

	// handle all requests by serving a file of the same name
	fs := http.Dir(*dir)
	handler := http.FileServer(fs)
	http.Handle("/", handler)

	log.Printf("Running on port %d\n", *port)

	addr := fmt.Sprintf("localhost:%d", *port)
	err := http.ListenAndServe(addr, nil)
	fmt.Println(err.Error())
}
